const insertLogSql = `INSERT INTO log (user_id, action_type, data) VALUES (?, ?, ?)`;
const selectLogSql = `SELECT * FROM log WHERE id=?`;

async function saveLog(conn, userId, actionType, data) {
  const validActionType = [
    "todo_add",
    "todo_remove",
    "todo_update",
    "todo_move",
    "column_add",
    "column_remove",
    "column_update",
  ];

  if (!validActionType.includes(actionType)) {
    throw new Error("Invalid actionType: " + actionType);
  }

  let [row] = await conn.query(insertLogSql, [
    userId,
    actionType,
    JSON.stringify(data),
  ]);

  [[row]] = await conn.query(selectLogSql, [row.insertId]);

  return {
    ...row,
    data: JSON.parse(row.data),
  };
}

export default saveLog;
