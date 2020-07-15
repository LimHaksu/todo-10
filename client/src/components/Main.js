import Element from "./basic/Element";
import Header from "./Header";
import Kanban from "./Kanban";
import Column from "./Column";

export default class Main extends Element {
  constructor() {
    super("div");
    this.$el = document.getElementById("app");
    this.appendChild(new Header());

    const kanban = new Kanban();
    kanban.push(1, new Column());
    kanban.push(2, new Column());
    kanban.push(3, new Column());
    kanban.push(4, new Column());
    kanban.push(5, new Column());
    kanban.push(6, new Column());
    kanban.push(7, new Column());
    this.appendChild(kanban);
  }
}
