import useDbConnection from "../../lib/useDbConnection";
import saveLog from "../../lib/saveLog";

const selectTodoSql = "SELECT * FROM todo WHERE id=? AND user_id=?";
const updatePrevColumnSql =
  "UPDATE todo SET idx=idx-1 WHERE idx>? AND column_id=?";
const updateNextColumnSql =
  "UPDATE todo SET idx=idx+1 WHERE idx>=? AND column_id=?";
const updateTodoSql = "UPDATE todo SET idx=?, column_id=? WHERE id=?";
const selectColumnSql = "SELECT * FROM todo_column WHERE id=?";

export default (req, res) => {
  useDbConnection(async (conn) => {
    const user = req.user;
    if (!user) {
      res.status(401);
      res.json({ error: "Invalid user" });
      return;
    }

    const [todo_id, next_idx, next_column_id] = [
      "todo_id",
      "next_idx",
      "next_column_id",
    ].map((key) => parseInt(req.body[key]));

    if ([todo_id, next_idx, next_column_id].some((n) => isNaN(n))) {
      res.status(400);
      res.json({ error: "Invalid values" });
      return;
    }

    const [[prevTodo]] = await conn.query(selectTodoSql, [todo_id, user.id]);
    const [[prevColumn]] = await conn.query(selectColumnSql, [
      prevTodo.column_id,
    ]);
    const [[nextColumn]] = await conn.query(selectColumnSql, [next_column_id]);
    if (!(prevTodo && prevColumn && nextColumn)) {
      res.status(400);
      res.json({ error: "Invalid values" });
      return;
    }

    await conn.query(updatePrevColumnSql, [prevTodo.idx, prevTodo.column_id]);
    await conn.query(updateNextColumnSql, [next_idx, next_column_id]);
    await conn.query(updateTodoSql, [next_idx, next_column_id, prevTodo.id]);

    if (prevTodo.column_id === next_column_id) {
      res.json({ result: null });
    } else {
      const log = await saveLog(conn, user.id, "todo_move", {
        todoContent: prevTodo.content,
        prevColumnContent: prevColumn.content,
        nextColumnContent: nextColumn.content,
      });

      res.json({ result: log });
    }
  });
};
