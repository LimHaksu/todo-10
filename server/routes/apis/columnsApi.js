import useDbConnection from "../../lib/useDbConnection";
import getUserById from "../../lib/getUserById";

const selectQuery = `select content from todo_column where id=?`;
const updateQuery = `update todo_column set content=? where id=?`;

const isValid = (columnId, nextColumnContent) =>
  columnId &&
  typeof columnId === "number" &&
  nextColumnContent &&
  typeof nextColumnContent === "string" &&
  nextColumnContent.length > 0;

const modifyColumnContent = (req, res) => {
  const columnId = req.body.column_id;
  const nextColumnContent = req.body.next_column_content;

  //TODO remove hardcoded user id
  const userId = 1;

  if (isValid(columnId, nextColumnContent)) {
    useDbConnection(async (con) => {
      const user = await getUserById(con, userId);
      if (!user) {
        res.status(401);
        res.json({
          error: "Invalid user",
        });
      }

      const [[selectResult]] = await con.query(selectQuery, [columnId]);
      if (!selectResult) {
        res.status(400);
        res.json({ error: "Invalid values" });
        return;
      }
      const prevColumnContent = selectResult.content;

      const [updateResult] = await con.query(updateQuery, [
        nextColumnContent,
        columnId,
      ]);
      res.json({
        result: {
          log_id: ~~(Math.random() * 1000),
          prev_column_content: prevColumnContent,
          next_column_content: nextColumnContent,
          username: user.username,
        },
      });
    });
  } else {
    res.status(400);
    res.json({ error: "Invalid values" });
  }
};

export default { modifyColumnContent };
