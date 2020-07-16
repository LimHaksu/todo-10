import { Router } from "express";
import todosApi from "./apis/todosApi";
import columnsApi from "./apis/columnsApi";

const router = Router();

/* GET home page. */
router.get("/todos", todosApi);
router.get("/columns", columnsApi);

module.exports = router;
