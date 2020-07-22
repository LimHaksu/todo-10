import useDbConnection from "../../lib/useDbConnection";

const loadTodoSql = `
SELECT col.content as col_content, 
todo.content as todo_content,
user.username as username
FROM todo 
JOIN todo_column as col ON todo.column_id=col.id 
JOIN user ON todo.user_id=user.id 
WHERE todo.id=?
`;
export default (req, res) => {
  const id = parseInt(req.query.todo_id);
  if (isNaN(id)) {
    res.status(400);
    res.send({ error: "Invalid todo id" });
  } else {
    useDbConnection(async (conn) => {
      // TODO: db에서 todo 찾기

      let [rows] = await conn.query(loadTodoSql, [id]);
      if (rows.length === 0) {
        res.status(400);
        res.send({ error: "Invalid todo id" });
      } else {
        // TODO: db log에 로그 생성
        const todoContent = rows[0].todo_content;
        const colContent = rows[0].col_content;
        const username = rows[0].username;
        await conn.query("DELETE FROM todo WHERE id=?", [id]);

        res.json({
          result: {
            log_id: ~~(Math.random() * 1000),
            todo_id: id,
            todo_content: todoContent,
            column_content: colContent,
            username: username,
          },
        });
      }
    });
  }
};
