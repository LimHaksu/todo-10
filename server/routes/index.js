import { Router } from "express";
import todosApi from "./apis/loadTodosApi";
import columnsApi from "./apis/columnsApi";
import addTodoApi from "./apis/addTodoApi";
import deleteTodoApi from "./apis/deleteTodoApi";
import loadLogsApi from "./apis/loadLogsApi";

const router = Router();

/* GET home page. */
router.get("/logs", loadLogsApi);
router.get("/todos", todosApi);
router.post("/todo", addTodoApi);
router.delete("/todo", deleteTodoApi);

router.patch("/todo_column", columnsApi.modifyColumnContent);

module.exports = router;
