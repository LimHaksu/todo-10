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
    this.$clickCount = 0;
    this.addEventListener("mousedown", (evt) => {
      this.$clickCount++;
      if (this.$clickCount === 1) {
        // single click
        const getTodoDom = (dom) => {
          if (dom.classList.contains("todo")) return dom;
          else return getTodoDom(dom.parentNode);
        };
        const todoDom = getTodoDom(evt.target);
        const { top, left } = todoDom.getBoundingClientRect();
        const offsetX = evt.clientX - left;
        const offsetY = evt.clientY - top;
        new TodoDrag(todoDom, offsetX, offsetY);

        setTimeout(() => {
          this.$clickCount = 0;
        }, 300);
      } else if (this.$clickCount === 2) {
        // double click
        new ModalTodoEdit({
          id,
          initialContent: this.$content,
          onEdit: this.handleEditSubmit.bind(this),
        });
        this.$clickCount = 0;
      }
    });
  }

  async handleEditSubmit(id, content) {
    const response = await api.editTodoApi(id, content);
    const logEvent = new LogEvent("todo_update", {
      logId: response.log_id,
      prevTodoContent: response.prev_todo_content,
      nextTodoContent: response.next_todo_content,
      username: response.username,
    });
    this.getDom().dispatchEvent(logEvent);
    this.setContent(response.next_todo_content);
  }

  setContent(content) {
    this.$content = content;
    this.$contentDiv.setText(content);
  }
}
