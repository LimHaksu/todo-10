import { useDbConnection, saveLog, checkUser } from "../../lib";

const loadLogsSql = `
SELECT * FROM log WHERE user_id=? ORDER BY created_at 
`;

export default (req, res) => {
  if (!checkUser(req, res)) return;
  const user = req.user;
  useDbConnection(async (conn) => {
    let [rows] = await conn.query(loadLogsSql, [user.id]);
    const result = rows.map((row) => ({
      action_type: row.action_type,
      data: {
        ...JSON.parse(row.data),
        createdAt: row.created_at,
        logId: row.id,
        username: user.username,
      },
    }));
    res.json({ result });
  });
};
