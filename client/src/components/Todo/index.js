import Element from "../basic/Element";
import "./Todo.css";
import Button from "../basic/Button";
import ModalTodoEdit from "../ModalTodoEdit";
import TodoDragController from "../TodoDrag";

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
        () => {
          alert("delete todo " + id);
        },
        { class: "reset-button-style" }
      )
    );

    this.appendChild(iconDiv);
    this.appendChild(centerDiv);
    this.appendChild(deleteDiv);
    this.addEventListener("mousedown", (evt) => {
      const getTodoDom = (dom) => {
        if (dom.classList.contains("todo")) return dom;
        else return getTodoDom(dom.parentNode);
      };
      const todoDom = getTodoDom(evt.target);
      const { top, left, width, height } = todoDom.getBoundingClientRect();
      const offsetX = evt.clientX - left;
      const offsetY = evt.clientY - top;
      new TodoDragController(todoDom, offsetX, offsetY);
    });
  }

  changeContent(content) {}
}
