import { useDbConnection, saveLog, checkUser } from "../../lib";

const selectQuery = `select content from todo_column where id=?`;
const updateQuery = `update todo_column set content=? where id=?`;

const isValidAll = (columnId, nextColumnContent) =>
  columnId &&
  typeof columnId === "number" &&
  nextColumnContent &&
  typeof nextColumnContent === "string" &&
  nextColumnContent.length > 0;

const modifyColumnContent = (req, res) => {
  if (!checkUser(req, res)) return;
  const user = req.user;

  const columnId = req.body.column_id;
  const nextColumnContent = req.body.next_column_content;

  if (!isValidAll(columnId, nextColumnContent)) {
    res.status(400);
    res.json({ error: "Invalid values" });
    return;
  }

  useDbConnection(async (conn) => {
    const [[selectResult]] = await conn.query(selectQuery, [columnId]);
    if (!selectResult) {
      res.status(400);
      res.json({ error: "Invalid values" });
      return;
    }
    const prevColumnContent = selectResult.content;

    const [updateResult] = await conn.query(updateQuery, [
      nextColumnContent,
      columnId,
    ]);

    const log = await saveLog(conn, user.id, "column_update", {
      prevColumnContent: prevColumnContent,
      nextColumnContent: nextColumnContent,
    });

    res.json({
      result: {
        log_id: log.id,
        prev_column_content: prevColumnContent,
        next_column_content: nextColumnContent,
        username: user.username,
        created_at: log.created_at,
      },
    });
  });
};

export default modifyColumnContent;
