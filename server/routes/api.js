const { Router } = require("express");

const router = Router();

/* GET home page. */
router.get("/todos", (req, res) => {
  if (!req.query.columns) {
    res.status(400);
    res.json({
      error: "Specify columns",
    });
  }

  const columns = req.query.columns.split(",").map(parseInt);

  const result = columns
    .map((column_id) => {
      if (column_id === 1) {
        return {
          column_id,
          todos: [
            { id: 1, username: "user1", content: "todo1" },
            { id: 2, username: "user1", content: "todo2" },
          ],
        };
      } else return null;
    })
    .filter((data) => data !== null);
  res.json({ result });
});
});

module.exports = router;
