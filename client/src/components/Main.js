import Element from "./basic/Element";
import Header from "./Header";
import Kanban from "./Kanban";
import Column from "./Column";
import Todo from "./Todo";
import Menu from "./Menu";
import Button from "./basic/Button";
import ModalTodoEdit from "./ModalTodoEdit";

export default class Main extends Element {
  constructor() {
    super("div");
    this.$el = document.getElementById("app");
    this.appendChild(new Header());

    this.appendChild(
      new Button(
        "show todo edit modal",
        () => {
          new ModalTodoEdit({
            content: "todotodotodotodadsf;lkjas",
            onEdit: () => {
              alert("onEdit Todo");
            },
            id: 1,
          });
        },
        { class: ["button-form", "button-green"] }
      )
    );

    const kanban = new Kanban();

    const createTestTodos = () => {
      return [1, 2, 3, 4, 5, 6, 7].map((i) => [
        i,
        new Todo({ id: i, content: "todo " + i, userneme: "user " + i }),
      ]);
    };

    kanban.push(1, new Column("Todo", createTestTodos()));
    kanban.push(2, new Column("Doing", createTestTodos()));
    kanban.push(3, new Column("Done", createTestTodos()));
    kanban.push(4, new Column("Todo", createTestTodos()));
    kanban.push(5, new Column("Doing", createTestTodos()));
    kanban.push(6, new Column("Done", createTestTodos()));
    this.appendChild(kanban);

    const menu = new Menu();
    this.appendChild(menu);
  }
}
