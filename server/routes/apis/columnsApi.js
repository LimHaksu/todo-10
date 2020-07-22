import useDbConnection from "../../lib/useDbConnection";

const selectQuery = `select content from todo_column where id=?`;
const updateQuery = `update todo_column set content=? where id=?`;

const isValid = (columnId, nextColumnContent) =>
  columnId &&
  typeof columnId === "number" &&
  nextColumnContent &&
  typeof nextColumnContent === "string" &&
  nextColumnContent.length > 0;

const modifyColumnContent = (req, res) => {
  const columnId = req.body.column_id;
  const nextColumnContent = req.body.next_column_content;
  if (isValid(columnId, nextColumnContent)) {
    useDbConnection(async (con) => {
      const [[selectResult]] = await con.query(selectQuery, [columnId]);
      if (!selectResult) {
        res.status(400);
        res.json({ error: "Invalid values" });
        return;
      }
      const prevColumnContent = selectResult.content;

      const [updateResult] = await con.query(updateQuery, [
        nextColumnContent,
        columnId,
      ]);
      res.json({
        result: {
          log_id: 361,
          prev_column_content: prevColumnContent,
          next_column_content: nextColumnContent,
        },
      });
    });
  } else {
    res.status(400);
    res.json({ error: "Invalid values" });
  }
};

export default { modifyColumnContent };
