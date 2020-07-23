import { useDbConnection, saveLog, checkUser } from "../../lib";

const loadTodoSql = `
SELECT col.content as col_content, 
todo.content as todo_content,
user.username as username
FROM todo 
JOIN todo_column as col ON todo.column_id=col.id 
JOIN user ON todo.user_id=user.id 
WHERE todo.id=?
AND todo.user_id=?
`;

const insertTodoRemoveLogSql = `
INSERT INTO log 
(user_id, action_type, data)
VALUES (?, ?, ?)
`;
export default (req, res) => {
  if (!checkUser(req, res)) return;
  const user = req.user;

  const id = parseInt(req.query.todo_id);
  if (isNaN(id)) {
    res.status(400);
    res.send({ error: "Invalid todo id" });
    return;
  }

  useDbConnection(async (conn) => {
    let [rows] = await conn.query(loadTodoSql, [id, user.id]);
    if (rows.length === 0) {
      res.status(400);
      res.send({ error: "Invalid todo id" });
      return;
    }

    const todoContent = rows[0].todo_content;
    const columnContent = rows[0].col_content;
    const username = rows[0].username;

    const data = {
      todoContent,
      columnContent,
    };

    await conn.query("DELETE FROM todo WHERE id=?", [id]);
    const log = await saveLog(conn, user.id, "todo_remove", data);

    res.json({
      result: {
        log_id: log.id,
        todo_id: id,
        todo_content: todoContent,
        column_content: columnContent,
        username: username,
        created_at: log.created_at,
      },
    });
  });
};
