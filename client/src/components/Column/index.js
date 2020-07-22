import { List, Element, H, Todo, Button } from "../basic";
import ModalColumnTitleEdit from "../ModalColumnTitleEdit";
import NewTodoForm from "./NewTodoForm";
import apiCallWrapper from "../../lib/apiCallWrapper";
import "./Column.scss";

const onTitleEdit = async (id, content) => {
  const response = await apiCallWrapper.modifyColumnApi(id, content);
};

const handleColumnTitleDoubleClick = (event, id, columnTitle) => {
  event.preventDefault();
  new ModalColumnTitleEdit({ id, columnTitle, onEdit: onTitleEdit });
};

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
    this.$count = new Element("div", {
      text: "" + todos.length,
      class: "column-todo-count",
    });
    headerLeft.appendChild(this.$count);

    this.$title = new H(2, title, {
      ondblclick: (event) => {
        handleColumnTitleDoubleClick(event, id, title);
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
  refreshCount() {
    this.$count.setText(this.$todos.getCount());
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
