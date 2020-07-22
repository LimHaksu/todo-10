import useDbConnection from "../../lib/useDbConnection";
import getUserById from "../../lib/getUserById";

const loadColumnSql = `
SELECT * FROM todo_column WHERE user_id=? ORDER BY idx 
`;

const loadTodosSql = `
SELECT * 
FROM todo 
WHERE column_id=?
AND user_id=?
ORDER BY idx DESC
`;

async function loadTodos(conn, columnId, userId, username) {
  const [rows] = await conn.query(loadTodosSql, [columnId, userId]);
  return rows.map((row) => ({
    id: row.id,
    content: row.content,
    username: username,
    column_id: row.column_id,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
}

export default (req, res) => {
  //TODO remove hardcoded userid
  const userId = 1;

  useDbConnection(async (conn) => {
    const user = await getUserById(conn, userId);
    if (!user) {
      res.status(401);
      res.json({
        error: "Invalid user",
      });
      return;
    }

    const username = user.username;

    const [cols] = await conn.query(loadColumnSql, [userId]);
    const result = await Promise.all(
      cols.map(
        (col) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve({
                id: col.id,
                idx: col.idx,
                content: col.content,
                username,
                created_at: col.created_at,
                updated_at: col.updated_at,
                todo_list: await loadTodos(conn, col.id, userId, username),
              });
            } catch (e) {
              reject(e);
            }
          })
      )
    );
    res.json({ result });
  });
};
