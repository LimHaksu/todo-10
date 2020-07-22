import { Element, List } from "../basic";
import Log from "../Log";
import "./Menu.css";
import api from "../../lib/apiCallWrapper";

export default class Menu extends Element {
  constructor() {
    super("div", { class: ["menu", "display-none"] });
    const title = new Element("div", { class: "menu-title", text: "☰ Menu" });
    this.appendChild(title);
    const activityTitle = new Element("div", {
      class: "menu-title",
      text: "🔔 Activity",
    });
    this.appendChild(activityTitle);
    this.$logs = new List(true);
    this.appendChild(this.$logs);
    api.loadLogsApi().then((res) => {
      res.forEach(({ action_type, data }) => {
        this.log(action_type, data);
      });
    });
  }

  setDisplay(flag) {
    if (flag) {
      this.getDom().classList.remove("display-none");
    } else {
      this.getDom().classList.add("display-none");
    }
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
