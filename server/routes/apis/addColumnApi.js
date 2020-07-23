import { useDbConnection, saveLog, checkUser } from "../../lib";

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
    //TODO remove hardcoded idx
    await conn.query(createColumnApi, [4, columnContent, user.id]);
    const log = await saveLog(conn, user.id, "column_add", { columnContent });

    res.json({
      result: {
        log_id: log.id,
        column_content: columnContent,
        username: user.username,
        created_at: log.created_at,
      },
    });
  });
};
