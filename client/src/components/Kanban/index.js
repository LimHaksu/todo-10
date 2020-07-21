import "./Kanban.css";
import List from "../basic/List";
import Column from "../Column";
import Todo from "../Todo";
import api from "../../lib/apiCallWrapper";

export default class Kanban extends List {
  constructor() {
    super(true, { class: "kanban" });
    const createTestTodos = () => {
      return [1, 2, 3, 4, 5, 6, 7].map((i) => [
        i,
        new Todo({ id: i, content: "todo " + i, userneme: "user " + i }),
      ]);
    };
    const { loadTodoApi } = api;
    loadTodoApi().then((res) => {
      res.forEach((colData) => {
        const todos = colData.todo_list.map((todoData) => [
          todoData.id,
          new Todo({
            id: todoData.id,
            content: todoData.content,
            username: todoData.username,
          }),
        ]);
        const column = new Column(colData.id, colData.content, todos);
        this.push(colData.id, column);
      });
    });
  }
}
