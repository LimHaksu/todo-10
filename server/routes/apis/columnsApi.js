import useDbConnection from "../../lib/useDbConnection";

const selectQuery = `select content from todo_column where id=?`;
const updateQuery = `update todo_column set content=? where id=?`;

const modifyColumnContent = (req, res) => {
  const columnId = req.body.column_id;
  const nextColumnContent = req.body.next_column_content;
  useDbConnection(async (con) => {
    const [[selectResult]] = await con.query(selectQuery, [columnId]);
    const prevColumnContent = selectResult.content;

    const [updateResult] = await con.query(updateQuery, [
      nextColumnContent,
      columnId,
    ]);
    if (updateResult.changedRows === 1) {
      res.json({
        result: {
          log_id: 361,
          prev_column_content: prevColumnContent,
          next_column_content: nextColumnContent,
        },
      });
    } else {
      res.status(500);
      res.json({ error: "수정된 내용 없음." });
    }
  });
};

export default { modifyColumnContent };
