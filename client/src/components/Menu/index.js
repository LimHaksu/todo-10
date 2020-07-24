import { Element, List, Button } from "../basic";
import Log from "../Log";
import "./Menu.css";
import api from "../../lib/apiCallWrapper";

function formatLogString(type, data) {
  let result = `<span class="username">${data.username}</span> `;
  switch (type) {
    case "todo_add":
      result += `added <span class="todo-content">${data.todoContent}</span> to <span class="column-content">${data.columnContent}</span>`;
      break;
    case "todo_remove":
      result += `removed <span class="todo-content">${data.todoContent}</span> from <span class="column-content">${data.columnContent}</span>`;
      break;
    case "todo_update":
      result += `edited <span class="todo-content">${data.prevTodoContent}</span> from <span class="todo-content">${data.nextTodoContent}</span>`;
      break;
    case "todo_move":
      result += `moved <span class="todo-content">${data.todoContent}</span> from <span class="column-content">${data.prevColumnContent}</span> to <span class="column-content">${data.nextColumnContent}</span>`;
      break;
    case "column_update":
      result += `changed column <span class="column-content">${data.prevColumnContent}</span> to <span class="column-content">${data.nextColumnContent}`;
      break;
    case "column_add":
      result += `created a column <span class="column-content">${data.columnContent}</span>`;
      break;
    case "column_remove":
      result += `removed <span class="column-content">${
        data.columnContent
      }</span> with <span class="deleted-todos-count">${
        data.deletedTodosCount
      }</span> ${data.deletedTodosCount === 1 ? "todo" : "todos"}`;
      break;
    default:
      throw new Error("Invalid log type: " + type);
  }
  return result;
}

export default class Menu extends Element {
  constructor() {
    super("div", { class: ["menu", "menu-hidden"] });
    const title = new Element("div", {
      class: ["menu-title", "flex-spacebetween"],
      text: "☰ Menu",
    });
    const closeButton = new Button(
      "❌",
      (evt) => {
        evt.preventDefault();
        this.setHidden(true);
      },
      {
        class: "close-button",
      }
    );
    title.appendChild(closeButton);
    this.appendChild(title);
    const activityTitle = new Element("div", {
      class: "menu-activity",
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

  setHidden(flag) {
    if (flag) {
      this.getDom().classList.add("menu-hidden");
    } else {
      this.getDom().classList.remove("menu-hidden");
    }
  }
  log(type, data) {
    this.$logs.pushFront(
      data.logId,
      new Log({
        todoContent: formatLogString(type, data),
        createdAt: data.createdAt,
      })
    );
  }
}
