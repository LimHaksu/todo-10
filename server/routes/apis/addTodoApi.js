import useDbConnection from "../../lib/useDbConnection";
import getUserById from "../../lib/getUserById";

const selectColumnByIdSql = `select id, content from todo_column where id=?`;

const updateTodoIdxSql = `
update todo set idx=idx+1 where column_id=?;
`;

const addTodoSql = `
insert into todo (user_id, column_id, idx, content) values(?, ?, 1, ?);
`;

export default (req, res) => {
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
      if (!user)
        res.json({
          error: "Invalid user",
        });
      let [rows] = await conn.query(selectColumnByIdSql, [column_id]);
      if (rows.length == 0) throw new Error("Column isn't exist.");
      const column_content = rows[0].title;

      await conn.query(updateTodoIdxSql, [column_id]);
      [rows] = await conn.query(addTodoSql, [user_id, column_id, content]);
      // TODO: save log
      res.json({
        result: {
          log_id: ~~(Math.random() * 1000),
          todo_id: rows.insertId,
          todo_content: content,
          column_content,
          username: user.username,
        },
      });
    });
  }
};
