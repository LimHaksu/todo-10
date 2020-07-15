import Element from "./basic/Element";
import "./Header.scss";
import H from "./basic/H";

export default class Header extends Element {
  constructor() {
    super("header", { class: ["header"] });
    this.appendChild(new H(1, "TODO 서비스", { class: "logo" }));
    this.appendChild(new H(2, "Menu"));
  }
}
