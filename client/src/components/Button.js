import Element from "./Element";
import "./Button.css";

export default class Button extends Element {
  constructor(text, onClick) {
    super("button");

    if (text === null || text === undefined) text = "Please set button text";
    this.getDom().textContent = text;
    console.log(this.getDom().outerText);
    if (onClick) this.getDom().addEventListener("click", onClick);
  }
}
