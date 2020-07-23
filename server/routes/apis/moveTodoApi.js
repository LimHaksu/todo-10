import useDbConnection from "../../lib/useDbConnection";

export default (req, res) => {
  useDbConnection(async (conn) => {
    const user = req.user;
    if (!req.user) {
      res.status(401);
      res.json({ error: "Invalid user" });
      return;
    }

    const [todo_id, next_idx, next_column_id] = [
      "todo_id",
      "next_idx",
      "next_column_id",
    ].map((key) => parseInt(req.body[key]));

    if ([todo_id, next_idx, next_column_id].some((n) => isNaN)) {
      res.satus(400);
      res.json({ error: "Invalid values" });
      return;
    }

    const result = {};
    res.json({ result });
  });
};
