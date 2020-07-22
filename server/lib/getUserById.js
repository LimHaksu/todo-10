const selectUserByIdSql = `select * from user where id=?`;
export default (conn, id) => {
  return conn.query(selectUserByIdSql, [id]).then(([rows]) => {
    if (rows.length === 0) return null;
    else return rows[0];
  });
};
