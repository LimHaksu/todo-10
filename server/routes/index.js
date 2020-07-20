import { Router } from "express";
import todosApi from "./apis/todosApi";
import columnsApi from "./apis/columnsApi";

const router = Router();

/* GET home page. */
router.get("/todos", todosApi);
router.get("/columns", columnsApi);

router.delete("/todo", (req, res) => {
  console.log(req.query);
  const id = parseInt(req.query.todo_id);
  if (isNaN(id)) {
    res.status = 400;
    res.send({ error: "Invalid todo id" });
  } else {
    res.json({
      result: {
        log_id: ~~(Math.random() * 1000),
        todo_id: 1,
        todo_content: "test toto sontent",
        column_content: "column",
      },
    });
  }
});
module.exports = router;
