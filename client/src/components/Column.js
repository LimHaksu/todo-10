import { List, Element } from "./basic";
import Todo from "./Todo";
import "./Column.css";

export default class Column extends Element {
  constructor() {
    super("div", { class: "column" });
    this.appendChild(new Element("h1", { text: "Pending" }));
    this.$todos = new List(true);
    this.appendChild(this.$todos);
    this.$todos.push(1, new Todo());
    this.$todos.push(2, new Todo());
    this.$todos.push(3, new Todo());
    this.$todos.push(4, new Todo());
    this.$todos.push(5, new Todo());
    this.$todos.push(6, new Todo());
    this.$todos.push(7, new Todo());
  }
}
