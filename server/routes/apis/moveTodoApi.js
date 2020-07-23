import { useDbConnection, saveLog, checkUser } from "../../lib";

const selectTodoSql = "SELECT * FROM todo WHERE id=? AND user_id=?";
const updatePrevColumnSql =
  "UPDATE todo SET idx=idx-1 WHERE idx>? AND column_id=?";
const updateNextColumnSql =
  "UPDATE todo SET idx=idx+1 WHERE idx>=? AND column_id=?";
const updateTodoSql = "UPDATE todo SET idx=?, column_id=? WHERE id=?";
const selectColumnSql = "SELECT * FROM todo_column WHERE id=?";

export default (req, res) => {
  useDbConnection(async (conn) => {
    if (!checkUser(req, res)) return;
    const user = req.user;

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
    if (!prevTodo) {
      res.status(400);
      res.json({ error: "Invalid values" });
      return;
    }

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

      res.json({
        result: {
          log_id: log.id,
          todo_id: todo_id,
          prev_column_content: prevColumn.content,
          next_column_content: nextColumn.content,
          todo_content: prevTodo.content,
          username: user.username,
          created_at: log.created_at,
        },
      });
    }
  });
};
