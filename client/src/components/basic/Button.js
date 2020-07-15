import Element from "./Element";

export default class Button extends Element {
  /**
   *
   * @param {string} text - Button text
   * @param {(event) => void} onClick
   * @param {Option} option
   */
  constructor(text, onClick, option) {
    super("button", option);

    if (text === null || text === undefined) text = "Please set button text";
    this.getDom().textContent = text;
    if (onClick) this.getDom().addEventListener("click", onClick);
  }
}
