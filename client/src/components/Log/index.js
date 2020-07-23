import { Element } from "../basic";
import "./Log.css";

function formatDatetime(str) {
  const date = new Date(str);
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

export default class Log extends Element {
  /**
   *
   * @param {{
   * userId : number
   * actionType : 'add' | 'remove' | 'update' | 'move'
   * todoId? : number
   * todoContent? : string
   * columnContent? : string
   * prevColumnContent? : string
   * createdAt : string
   * }} log
   */
  constructor(log) {
    super("div", { class: "log" });
    const content = new Element("div");
    content.getDom().innerHTML = log.todoContent;
    const timeDiv = new Element("div", {
      text: formatDatetime(log.createdAt),
      class: "time-content",
    });
    this.appendChild(content);
    this.appendChild(timeDiv);
  }
}
