import useDbConnection from "../../lib/useDbConnection";

const selectQuery = `select content from todo_column where id=?`;
const updateQuery = `update todo_column set content=? where id=?`;

const isValid = (columnId, nextColumnContent) => {
  return (
    columnId &&
    typeof columnId === "number" &&
    content &&
    typeof content === string &&
    content.length > 0
  );
};

const modifyColumnContent = (req, res) => {
  const { columnId, nextColumnContent } = req.body;
  if (isValid(columnId, nextColumnContent)) {
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
  } else {
    res.status(400);
    res.json({ error: "Invalid values" });
  }
};

export default { modifyColumnContent };
