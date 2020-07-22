import useDbConnection from "../../lib/useDbConnection";
import getUserById from "../../lib/getUserById";

const loadLogsSql = `
SELECT * FROM log WHERE user_id=? ORDER BY created_at 
`;

export default (req, res) => {
  const userId = 1;
  useDbConnection(async (conn) => {
    const user = await getUserById(conn, userId);
    if (!user) {
      res.status(401);
      res.json({ error: "Invalid user" });
      return;
    }

    let [rows] = await conn.query(loadLogsSql, [userId]);
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
