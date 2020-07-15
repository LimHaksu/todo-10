import "./Kanban.css";
import List from "./basic/List";

export default class Kanban extends List {
  constructor() {
    super(true, { class: "kanban" });
  }
}
