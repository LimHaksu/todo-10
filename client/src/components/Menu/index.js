import { Element, List } from "../basic";
import Log from "../Log";
import "./Menu.css";

export default class Menu extends Element {
  constructor() {
    super("div", { class: "menu" });
    const title = new Element("div", { class: "menu-title", text: "☰ Menu" });
    this.appendChild(title);
    const activityTitle = new Element("div", {
      class: "menu-title",
      text: "🔔 Activity",
    });
    this.appendChild(activityTitle);
    this.$logs = new List(true);
    this.appendChild(this.$logs);
    this.$logs.push(1, new Log({ todoContent: "로그1" }));
    this.$logs.push(2, new Log({ todoContent: "로그2" }));
    this.$logs.push(3, new Log({ todoContent: "로그3" }));
  }

  log(type, data) {
    switch (type) {
      case "add-todo":
        console.log("add", data);
        break;
      case "remove-todo":
        console.log("remove", data);
        break;
      default:
        throw new Error("Invalid log type: ", type);
    }
  }
}
