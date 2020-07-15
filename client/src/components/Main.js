import Element from "./basic/Element";
import Header from "./Header";
import Kanban from "./Kanban";
import Column from "./Column";

export default class Main extends Element {
  constructor() {
    super("div");
    this.appendChild(new Header());

    const kanban = new Kanban();
    kanban.push(1, new Column());
    kanban.push(2, new Column());
    kanban.push(3, new Column());
    this.appendChild(kanban);
  }
}
