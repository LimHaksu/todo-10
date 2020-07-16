import { List, Element, H } from "./basic";
import Todo from "./Todo";
import "./Column.scss";
import Button from "./basic/Button";
import TextArea from "./basic/TextArea";

const handleAddButtonClick = () => {};
const handleCancelButtonClick = () => {};

class NewTodoWrapper extends Element {
  constructor() {
    super("div", { class: "new-todo-wrapper" });

    this.$textarea = new TextArea({
      class: "todo-textarea",
      placeholder: "Enter a note",
    });
    this.appendChild(this.$textarea);

    const buttonWrapper = new Element("div", { class: "button-wrapper" });
    this.appendChild(buttonWrapper);
    this.$addButton = new Button("Add", handleAddButtonClick, {
      class: ["button", "todo-add"],
    });
    this.$cancelButton = new Button("Cancel", handleCancelButtonClick, {
      class: ["button", "todo-cancel"],
    });
    buttonWrapper.appendChild(this.$addButton);
    buttonWrapper.appendChild(this.$cancelButton);
  }
}

export default class Column extends Element {
  /**
   *
   * @param {string} title
   * @param {Todo[]} todos
   */
  constructor(title, todos = []) {
    super("div", { class: "column" });
    const header = new Element("div", { class: "column-header" });

    const headerLeft = new Element("div", { class: "flex" });
    this.$count = new Element("div", {
      text: "" + todos.length,
      class: "column-todo-count",
    });
    headerLeft.appendChild(this.$count);
    this.$title = new H(2, title);
    headerLeft.appendChild(this.$title);

    const headerRight = new Element("div");
    this.$newBtn = new Button(
      "+",
      (evt) => {
        alert("+ button clicked");
      },
      { class: ["reset-button-style"] }
    );
    headerRight.appendChild(this.$newBtn);
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

    this.$newTodoWrapper = new NewTodoWrapper();
    this.appendChild(this.$newTodoWrapper);

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
    this.$todos.push(key, todo);
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
