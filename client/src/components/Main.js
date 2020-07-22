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

    this.appendChild(kanban);

    const menu = new Menu();
    this.appendChild(menu);
    this.addEventListener("log", (evt) => {
      menu.log(evt.detail.type, evt.detail.data);
    });
    this.addEventListener("show-menu", (evt) => {
      menu.setDisplay(true);
    });
  }
}
