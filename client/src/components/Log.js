import { Element } from "./basic";
import "./Log.css";

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
    const content = new Element("div", { text: log.todoContent });
    this.appendChild(content);
  }
}
