import { useDbConnection, saveLog, checkUser } from "../../lib";

const selectColumnByIdSql = `select id, content from todo_column where id=?`;

const updateTodoIdxSql = `
update todo set idx=idx+1 where column_id=?;
`;

const addTodoSql = `
insert into todo (user_id, column_id, idx, content) values(?, ?, 1, ?);
`;

const insertTodoAddLogSql = `
INSERT INTO log 
(user_id, action_type, data)
VALUES (?, ?, ?)
`;

export default (req, res) => {
  const { column_id, content } = req.body;
  if (!checkUser(req, res)) return;
  const user = req.user;

  if (
    !(column_id && typeof column_id === "number") ||
    !((content && typeof content === "string") || content.length > 0)
  ) {
    res.status(400);
    res.json({ error: "Invalid values" });
    return;
  }
  useDbConnection(async (conn) => {
    let [rows] = await conn.query(selectColumnByIdSql, [column_id]);
    if (rows.length == 0) throw new Error("Column doesn't exist.");
    const columnContent = rows[0].content;

    await conn.query(updateTodoIdxSql, [column_id]);
    [rows] = await conn.query(addTodoSql, [user.id, column_id, content]);
    const data = {
      todoContent: content,
      columnContent,
    };

    const log = await saveLog(conn, user.id, "todo_add", data);
    const [insertLogResult] = await conn.query(insertTodoAddLogSql, [
      user.id,
      "todo_add",
      JSON.stringify(data),
    ]);

    res.json({
      result: {
        log_id: log.id,
        todo_id: rows.insertId,
        todo_content: content,
        column_content: columnContent,
        username: user.username,
        created_at: log.created_at,
      },
    });
  });
};
