import { Element } from "../basic";
export default class DragPlaceholder extends Element {
  constructor() {
    super("li");
    this.$placeholder = new Element("div", { class: "todo-placeholder" });
    this.$placeholder.setText("place");
    this.appendChild(this.$placeholder);
  }
}
