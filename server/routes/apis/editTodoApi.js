import { useDbConnection, saveLog, checkUser } from "../../lib";

const loadTodoSql = `SELECT * FROM todo WHERE id=?`;
const updateTodoSql = `UPDATE todo SET content=? WHERE id=?`;

function validateBody(id, content) {
  return id > 0 && typeof content === "string" && content.length > 0;
}

export default (req, res) => {
  if (!checkUser(req, res)) return;
  const user = req.user;

  let { todo_id, todo_content } = req.body;
  todo_id = parseInt(todo_id);

  if (!validateBody(todo_id, todo_content)) {
    res.status(400);
    res.json({ error: "Invalid values" });
    return;
  }

  useDbConnection(async (conn) => {
    let [rows] = await conn.query(loadTodoSql, [todo_id]);
    if (rows.length === 0) {
      res.status(400);
      res.json({ error: "Invalid values" });
      return;
    }

    const prev_todo_content = rows[0].content;

    [rows] = await conn.query(updateTodoSql, [todo_content, todo_id]);

    const logData = {
      todoId: todo_id,
      prevTodoContent: prev_todo_content,
      nextTodoContent: todo_content,
    };

    const log = await saveLog(conn, user.id, "todo_update", logData);

    res.json({
      result: {
        log_id: log.id,
        todo_id,
        prev_todo_content,
        next_todo_content: todo_content,
        username: user.username,
        created_at: log.created_at,
      },
    });
  });
};
