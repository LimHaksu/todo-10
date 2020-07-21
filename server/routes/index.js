import { Router } from "express";
import todosApi from "./apis/loadTodosApi";
import columnsApi from "./apis/columnsApi";

const router = Router();

/* GET home page. */
router.get("/todos", todosApi);

router.delete("/todo", (req, res) => {
  const id = parseInt(req.query.todo_id);
  if (isNaN(id)) {
    res.status = 400;
    res.send({ error: "Invalid todo id" });
  } else {
    // TODO: db에서 todo 찾기
    // TODO: db log에 로그 생성
    // TODO: db에서 todo 삭제
    res.json({
      result: {
        log_id: ~~(Math.random() * 1000),
        todo_id: 1,
        todo_content: "test toto sontent",
        column_content: "column",
        username: "crog",
      },
    });
  }
});
module.exports = router;
