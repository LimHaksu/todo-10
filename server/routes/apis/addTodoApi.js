import useDbConnection from "../../lib/useDbConnection";

const updateTodoIdxSql = `
update todo set idx=idx+1 where column_id=?;
`;

const addTodoSql = `
insert into todo (user_id, column_id, idx, content) values(?, ?, 1, ?);
`;

export default (req, res) => {
  const { column_id, content } = req.body;
  if (
    !(column_id && typeof column_id === "number") ||
    !((content && typeof content === "string") || content.length > 0)
  ) {
    res.status(400);
    res.json({ error: "Invalid values" });
  } else {
    useDbConnection(async (conn) => {
      let [
        rows,
      ] = await conn.query("select id, title from todo_column where id=?", [
        column_id,
      ]);
      if (rows.length == 0) throw new Error("Column isn't exist.");
      const column_content = rows[0].title;

      await conn.query(updateTodoIdxSql, [column_id]);
      // TODO: set uder id
      [rows] = await conn.query(addTodoSql, [1, column_id, content]);
      // TODO: save log
      res.json({
        log_id: ~~(Math.random() * 1000),
        todo_id: rows.insertId,
        todo_content: content,
        column_content,
        username: "crog",
      });
    });
  }
};
