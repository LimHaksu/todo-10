import { Element, Textarea, Button } from "../basic";
import apiCallWrapper from "../../lib/apiCallWrapper";
import Todo from "../Todo";
import LogEvent from "../../lib/LogEvent";
import "../global.scss";

const handleAddButtonClick = async (
  columnId,
  todoContent,
  addTodo,
  clearTextInTextarea,
  emitLogEvent
) => {
  const result = await apiCallWrapper.addTodoApi(columnId, todoContent);
  if (result) {
    const todo = new Todo({
      id: result.todo_id,
      content: result.todo_content,
      username: result.username,
    });
    addTodo(result.todo_id, todo);

    const logEvent = new LogEvent("todo_add", {
      logId: result.log_id,
      todoId: result.todo_id,
      todoContent: result.todo_content,
      columnContent: result.column_content,
      username: result.username,
      createdAt: result.created_at,
    });
    emitLogEvent(logEvent);

    clearTextInTextarea();
  }
};

export default class NewTodoForm extends Element {
  constructor(columnId, addTodo) {
    super("form", { class: ["form", "display-none"] });
    this.$isDisplay = false;
    this.$textarea = new Textarea({
      name: "todo-content",
      placeholder: "Enter a note",
    });
    this.$textarea.getDom().addEventListener("input", (event) => {
      const text = this.getTextInTextarea();
      if (text.length > 0) {
        if (text.length > 500) {
          this.$textarea.getDom().value = text.substr(0, 500);
        }
        this.setAddButtonDisabled(false);
      } else {
        this.setAddButtonDisabled(true);
      }
    });
    this.appendChild(this.$textarea);

    const buttonWrapper = new Element("div", { class: "flex-spacebetween" });
    this.appendChild(buttonWrapper);
    this.$addButton = new Button(
      "Add",
      (event) => {
        event.preventDefault();
        const todoContent = this.getTextInTextarea();
        handleAddButtonClick(
          columnId,
          todoContent,
          addTodo,
          this.clearTextInTextarea.bind(this),
          this.emitLogEvent.bind(this)
        );
      },
      {
        class: ["button-form", "button-green", "button-disabled"],
        type: "submit",
      }
    );
    this.$addButton.getDom().disabled = true;

    this.$cancelButton = new Button(
      "Cancel",
      (evt) => {
        event.preventDefault();
        this.setDisplayNone(true);
      },
      {
        class: ["button-form", "button-grey"],
      }
    );
    buttonWrapper.appendChild(this.$addButton);
    buttonWrapper.appendChild(this.$cancelButton);
  }

  setAddButtonDisabled(flag) {
    this.$addButton.getDom().disabled = flag;
    if (flag) {
      this.$addButton.getDom().classList.add("button-disabled");
    } else {
      this.$addButton.getDom().classList.remove("button-disabled");
    }
  }

  getTextInTextarea() {
    return this.$textarea.getDom().value;
  }

  clearTextInTextarea() {
    this.$textarea.getDom().value = "";
    this.setAddButtonDisabled(true);
  }

  setDisplayNone(flag) {
    this.$isDisplay = !flag;
    if (flag) {
      this.getDom().classList.add("display-none");
    } else {
      this.getDom().classList.remove("display-none");
    }
  }

  emitLogEvent(logEvent) {
    this.getDom().dispatchEvent(logEvent);
  }
}
