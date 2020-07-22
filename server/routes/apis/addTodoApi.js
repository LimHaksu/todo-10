import useDbConnection from "../../lib/useDbConnection";
import getUserById from "../../lib/getUserById";

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
  // TODO: remove hardcoded user id
  const userId = 1;

  const { column_id, content } = req.body;
  // TODO fix hardcoded user id;
  const user_id = 1;
  if (
    !(column_id && typeof column_id === "number") ||
    !((content && typeof content === "string") || content.length > 0)
  ) {
    res.status(400);
    res.json({ error: "Invalid values" });
  } else {
    useDbConnection(async (conn) => {
      const user = await getUserById(conn, user_id);
      if (!user) {
        res.status(401);
        res.json({
          error: "Invalid user",
        });
      }
      let [rows] = await conn.query(selectColumnByIdSql, [column_id]);
      if (rows.length == 0) throw new Error("Column isn't exist.");
      const columnContent = rows[0].content;

      await conn.query(updateTodoIdxSql, [column_id]);
      [rows] = await conn.query(addTodoSql, [user_id, column_id, content]);
      const data = {
        todoContent: content,
        columnContent,
      };

      conn.query(insertTodoAddLogSql, [
        userId,
        "todo_add",
        JSON.stringify(data),
      ]);

      // TODO: save log
      res.json({
        result: {
          log_id: ~~(Math.random() * 1000),
          todo_id: rows.insertId,
          todo_content: content,
          column_content: columnContent,
          username: user.username,
        },
      });
    });
  }
};
