import { Element } from "./basic";
import "./Button.css";

export default class Button extends Element {
  constructor(text, onClick) {
    super("button");

    if (text === null || text === undefined) text = "Please set button text";
    this.getDom().textContent = text;
    if (onClick) this.getDom().addEventListener("click", onClick);
  }
}
