import { useDbConnection, saveLog, checkUser } from "../../lib";

const selectColumnSql = `SELECT * FROM todo_column WHERE id=? AND user_id=?`;
const updateColumnSql =
  "UPDATE todo_column SET idx=idx+1 WHERE idx>? AND user_id=?";
const deleteTodoSql = "DELETE FROM todo WHERE column_id=?";
const deleteColumnSql = "DELETE FROM todo_column WHERE id=?";

export default (req, res) => {
  if (!checkUser(req, res)) return;
  const user = req.user;

  const id = parseInt(req.query.column_id);
  if (isNaN(id)) {
    res.status(400);
    res.send({ error: "Invalid column id" });
    return;
  }

  useDbConnection(async (conn) => {
    const [[column]] = await conn.query(selectColumnSql, [id, user.id]);
    if (!column) {
      res.status(400);
      res.send({ error: "Invalid column id" });
      return;
    }

    await conn.query(updateColumnSql, [column.idx, user.id]);
    const [deleted] = await conn.query(deleteTodoSql, [column.id]);
    await conn.query(deleteColumnSql, [id]);

    const data = {
      columnContent: column.content,
      deletedTodosCount: deleted.affectedRows,
    };

    const log = await saveLog(conn, user.id, "column_remove", data);

    res.json({
      result: {
        log_id: log.id,
        column_content: column.content,
        deleted_todos_count: deleted.affectedRows,
        username: user.username,
        created_at: log.created_at,
      },
    });
  });
};
