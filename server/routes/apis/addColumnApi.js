import { useDbConnection, saveLog, checkUser } from "../../lib";

const countColumns =
  "SELECT COUNT(*) as numOfcolumns FROM todo_column WHERE user_id = ?";
const createColumnApi =
  "INSERT INTO todo_column (idx, content, user_id) VALUES(?, ?, ?)";
export default (req, res) => {
  if (!checkUser(req, res)) return;
  const user = req.user;

  const columnContent = req.body.column_content.trim();
  if (columnContent.length === 0) {
    res.status(400);
    res.json({
      error: "Invalid values",
    });
    return;
  }

  useDbConnection(async (conn) => {
    const [[row]] = await conn.query(countColumns, [user.id]);
    const columnIdx = row.numOfcolumns + 1;
    const [resultOfInsert] = await conn.query(createColumnApi, [
      columnIdx,
      columnContent,
      user.id,
    ]);
    const log = await saveLog(conn, user.id, "column_add", { columnContent });
    res.json({
      result: {
        log_id: log.id,
        column_id: resultOfInsert.insertId,
        column_content: columnContent,
        username: user.username,
        created_at: log.created_at,
      },
    });
  });
};
