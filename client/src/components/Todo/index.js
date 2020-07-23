import Element from "../basic/Element";
import "./Todo.css";
import Button from "../basic/Button";
import ModalTodoEdit from "../ModalTodoEdit";
import TodoDrag from "../TodoDrag";
import LogEvent from "../../lib/LogEvent";
import api from "../../lib/apiCallWrapper";
import ModalConfirm from "../basic/ModalConfirm";

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
    this.$contentDiv = new Element("section", { text: content });
    this.$content = content;
    const authorDiv = new Element("div", { text: `Added by ${username}` });
    centerDiv.appendChild(this.$contentDiv);
    centerDiv.appendChild(authorDiv);

    const deleteDiv = new Element("div");
    const deleteButton = new Button(
      "🗑️",
      async function () {
        new ModalConfirm(async () => {
          const result = await api.removeTodoApi(id);
          const logEvent = new LogEvent("todo_remove", {
            logId: result.log_id,
            todoId: result.todo_id,
            todoContent: result.todo_content,
            columnContent: result.column_content,
            username: result.username,
          });

          const parent = this.getDom().parentNode;
          this.getDom().dispatchEvent(logEvent);
          this.removeSelf();
          parent.dispatchEvent(new Event("refreshcount", { bubbles: true }));
          // parent.remove();
        });
      }.bind(this),
      { class: "reset-button-style" }
    );
    deleteButton.addEventListener("mousedown", (evt) => {
      evt.stopPropagation();
    });
    deleteDiv.appendChild(deleteButton);

    this.appendChild(iconDiv);
    this.appendChild(centerDiv);
    this.appendChild(deleteDiv);
    this.addEventListener("mousedown", (evt) => {
      const getTodoDom = (dom) => {
        if (dom.classList.contains("todo")) return dom;
        else return getTodoDom(dom.parentNode);
      };
      const todoDom = getTodoDom(evt.target);
      const { top, left } = todoDom.getBoundingClientRect();
      const offsetX = evt.clientX - left;
      const offsetY = evt.clientY - top;
      new TodoDrag(todoDom, offsetX, offsetY);
    });
  }

  changeContent(content) {}
}
