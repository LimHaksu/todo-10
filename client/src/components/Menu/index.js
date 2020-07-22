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
      case "todo_add":
        this.$logs.pushFront(
          data.logId,
          new Log({
            todoContent: `${data.username} added ${data.todoContent} to ${data.columnContent}`,
          })
        );
        break;
      case "todo_remove":
        this.$logs.pushFront(
          data.logId,
          new Log({
            todoContent: `${data.username} removed ${data.todoContent} from ${data.columnContent}`,
          })
        );
        break;
      case "todo_update":
        this.$logs.pushFront(
          data.logId,
          new Log({
            todoContent: `${data.username} edited ${data.prevTodoContent} from ${data.nextTodoContent}`,
          })
        );
        break;
      case "todo_move":
        this.$logs.pushFront(
          data.logId,
          new Log({
            todoContent: `${data.username} moved ${data.todoContent} from ${data.prevColumnContent} to ${data.nextColumnContent}`,
          })
        );
        break;
      case "column_update":
        this.$logs.pushFront(
          data.logId,
          new Log({
            todoContent: `${data.username} changed column ${data.prevColumnContent} to ${data.nextColumnContent}`,
          })
        );
        break;
      default:
        throw new Error("Invalid log type: " + type);
    }
  }
}
