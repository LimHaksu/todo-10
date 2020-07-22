import useDbConnection from "../../lib/useDbConnection";
import getUserById from "../../lib/getUserById";

const loadLogsSql = `
SELECT * FROM log WHERE user_id=? ORDER BY created_at DESC
`;

export default (req, res) => {
  const userId = 1;
  useDbConnection(async (conn) => {
    const user = getUserById(conn, userId);
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
        created_at: row.created_at,
      },
    }));
    res.json({ result });
  });
};
