import { Router } from "express";
import todosApi from "./apis/loadTodosApi";
import modifyColumnContent from "./apis/columnsApi";
import addTodoApi from "./apis/addTodoApi";
import deleteTodoApi from "./apis/deleteTodoApi";
import loadLogsApi from "./apis/loadLogsApi";
import editTodoApi from "./apis/editTodoApi";
import moveTodoApi from "./apis/moveTodoApi";

const router = Router();

/* GET home page. */
router.get("/logs", loadLogsApi);
router.get("/todos", todosApi);
router.post("/todo", addTodoApi);
router.delete("/todo", deleteTodoApi);
router.patch("/todo", editTodoApi);
router.patch("/todo_move", moveTodoApi);

router.patch("/todo_column", modifyColumnContent);

module.exports = router;
