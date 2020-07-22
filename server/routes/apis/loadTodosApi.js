import useDbConnection from "../../lib/useDbConnection";

const loadColumnSql = `
SELECT * FROM todo_column ORDER BY idx
`;

const loadTodosSql = `
SELECT * 
FROM todo 
WHERE column_id=?
ORDER BY idx DESC
`;

const username = "circle";
async function loadTodos(conn, columnId) {
  const [rows] = await conn.query(loadTodosSql, [columnId]);
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
  useDbConnection(async (conn) => {
    const [cols] = await conn.query(loadColumnSql);
    const result = await Promise.all(
      cols.map(
        (col) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve({
                id: col.id,
                idx: col.idx,
                content: col.content,
                username: username,
                created_at: col.created_at,
                updated_at: col.updated_at,
                todo_list: await loadTodos(conn, col.id),
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
