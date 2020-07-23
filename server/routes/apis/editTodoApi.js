import useDbConnection from "../../lib/useDbConnection";
import getUserById from "../../lib/getUserById";

const loadTodoSql = `SELECT * FROM todo WHERE id=?`;
const updateTodoSql = `UPDATE todo SET content=? WHERE id=?`;
const insertUpdateTodoLogSql = `
INSERT INTO log 
(user_id, action_type, data)
VALUES (?, "todo_update", ?)
`;

function validateBody(id, content) {
  return id > 0 && typeof content === "string" && content.length > 0;
}

export default (req, res) => {
  const userId = 1;
  let { todo_id, todo_content } = req.body;
  todo_id = parseInt(todo_id);

  if (!validateBody(todo_id, todo_content)) {
    res.status(400);
    res.json({ error: "Invalid values" });
    return;
  }

  useDbConnection(async (conn) => {
    const user = await getUserById(conn, userId);
    if (!user) {
      res.status(401);
      res.json({ error: "Invalid user" });
      return;
    }

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

    [rows] = await conn.query(insertUpdateTodoLogSql, [
      userId,
      JSON.stringify(logData),
    ]);
    const logId = rows.insertId;
    [rows] = await conn.query("SELECT created_at FROM log WHERE id=?", [logId]);
    const createdAt = rows[0].created_at;

    res.json({
      result: {
        log_id: logId,
        todo_id,
        prev_todo_content,
        next_todo_content: todo_content,
        username: user.username,
        created_at: createdAt,
      },
    });
  });
};
