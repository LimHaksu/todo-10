import Element from "./basic/Element";
import "./Todo.css";
import Button from "./basic/Button";

export default class Todo extends Element {
  constructor({ id, content, username }) {
    super("div", { class: ["todo", "flex"] });
    this.addEventListener("dblclick", () => {
      alert("dbclick todo " + id);
    });
    const iconDiv = new Element("div", { text: "📝" });

    const centerDiv = new Element("div", {
      class: ["flex-grow-1", "margin1", "todo-center"],
    });
    this.$contentDiv = new Element("div", { text: content });
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
  }

  changeContent(content) {}
}
