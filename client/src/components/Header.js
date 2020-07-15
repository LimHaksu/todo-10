import Element from "./basic/Element";
import "./Header.css";

export default class Header extends Element {
  constructor() {
    super("header", { class: ["header"] });
  }
}
