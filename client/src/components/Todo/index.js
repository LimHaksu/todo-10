import Element from "../basic/Element";
import "./Todo.css";
import Button from "../basic/Button";
import ModalTodoEdit from "../ModalTodoEdit";
import LogEvent from "../../lib/LogEvent";

export default class Todo extends Element {
  constructor({ id, content, username }) {
    super("div", { class: ["todo", "flex"] });
    this.addEventListener("dblclick", () => {
      new ModalTodoEdit({
        id,
        initialContent: this.$content,
        onEdit: (id, msg) => {
          alert(id + " : " + msg);
        },
      });
    });
    const iconDiv = new Element("div", { text: "📝" });

    const centerDiv = new Element("div", {
      class: ["flex-grow-1", "margin1", "todo-center"],
    });
    this.$contentDiv = new Element("div", { text: content });
    this.$content = content;
    const authorDiv = new Element("div", { text: `Added by ${username}` });
    centerDiv.appendChild(this.$contentDiv);
    centerDiv.appendChild(authorDiv);

    const deleteDiv = new Element("div");
    deleteDiv.appendChild(
      new Button(
        "🗑️",
        function () {
          // TODO: API call

          const logEvent = new LogEvent("remove-todo", {
            todoId: id,
            todoContent: content,
            username,
          });
          this.getDom().dispatchEvent(logEvent);
          this.removeSelf();
        }.bind(this),
        { class: "reset-button-style" }
      )
    );

    this.appendChild(iconDiv);
    this.appendChild(centerDiv);
    this.appendChild(deleteDiv);
  }

  changeContent(content) {}
}
