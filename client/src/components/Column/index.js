import { List, Element, H, Todo, Button } from "../basic";
import ModalColumnTitleEdit from "../ModalColumnTitleEdit";
import NewTodoForm from "./NewTodoForm";
import apiCallWrapper from "../../lib/apiCallWrapper";
import "./Column.scss";
import LogEvent from "../../lib/LogEvent";

export default class Column extends Element {
  /**
   *
   * @param {string} content
   * @param {{todo_id, Todo}[]} todos
   */
  constructor(id, title, todos = []) {
    super("div", { class: "column" });
    const header = new Element("div", { class: "column-header" });

    const headerLeft = new Element("div", { class: "flex" });
    this.$id = id;
    this.$count = new Element("div", {
      text: "" + todos.length,
      class: "column-todo-count",
    });
    this.addEventListener("refreshcount", (evt) => {
      this.refreshCount();
    });
    headerLeft.appendChild(this.$count);

    this.$title = new H(2, title, {
      ondblclick: () => {
        this.showColumnEditModal();
      },
    });
    headerLeft.appendChild(this.$title);

    const headerRight = new Element("div");
    this.$newBtn = new Button(
      "+",
      (evt) => {
        if (this.$newTodoForm.$isDisplay) {
          this.$newTodoForm.setDisplayNone(true);
        } else {
          this.$newTodoForm.setDisplayNone(false);
        }
      },
      { class: ["reset-button-style"] }
    );
    headerRight.appendChild(this.$newBtn);
    this.isNewBtnHidden = true;
    this.$dotBtn = new Button(
      "...",
      (evt) => {
        alert("... button clicked");
      },
      { class: ["reset-button-style"] }
    );
    headerRight.appendChild(this.$dotBtn);

    header.appendChild(headerLeft);
    header.appendChild(headerRight);
    this.appendChild(header);

    this.$newTodoForm = new NewTodoForm(id, this.addTodo.bind(this));
    this.appendChild(this.$newTodoForm);

    this.$todos = new List(true);
    const todosWrapper = new Element("div", { class: "column-todos-wrapper" });
    todosWrapper.appendChild(this.$todos);
    this.appendChild(todosWrapper);

    todos.forEach(([i, todo]) => {
      this.addTodo(i, todo);
    });
  }

  /**
   * @private
   */
  showColumnEditModal() {
    const onTitleEdit = async (content) => {
      if (content.length === 0) return;
      const response = await apiCallWrapper.modifyColumnApi(this.$id, content);
      this.setTitle(response.next_column_content);

      // Create log event
      const logEvent = new LogEvent("column_update", {
        logId: response.log_id,
        prevColumnContent: response.prev_column_content,
        nextColumnContent: response.next_column_content,
        username: response.username,
      });
      this.getDom().dispatchEvent(logEvent);
    };
    new ModalColumnTitleEdit({
      columnTitle: this.$title.getDom().textContent,
      onEdit: onTitleEdit,
    });
  }

  /**
   * @private
   */
  refreshCount() {
    const count = this.$todos.getDom().querySelectorAll(".todo").length;
    this.$count.setText(count);
  }

  addTodo(key, todo) {
    this.$todos.pushFront(key, todo);
    this.refreshCount();
  }

  removeTodo(key) {
    this.$todos.remove(key);
    this.refreshCount();
  }

  /**
   *
   * @param {string} title
   */
  setTitle(title) {
    this.$title.setText(title);
  }
}
