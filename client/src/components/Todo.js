import Element from "./basic/Element";
import "./Todo.css";

export default class Todo extends Element {
  constructor() {
    super("div", { class: ["todo"] });
    const content = new Element("div", { text: "todotodo" });
    this.appendChild(content);
  }
}
