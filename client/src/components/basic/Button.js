import Element from "./Element";

export default class Button extends Element {
  /**
   *
   * @param {string | Element} content - Button text
   * @param {(event) => void} onClick
   * @param {Option} option
   */
  constructor(content, onClick, option) {
    super("button", option);

    if (content && typeof content === "string")
      this.getDom().textContent = content;
    else if (
      typeof content === "object" &&
      Object.getPrototypeOf(content) instanceof Element
    ) {
      this.appendChild(content);
    }
    if (onClick) this.getDom().addEventListener("click", onClick);

    if (option) {
      if (option.type) {
        this.getDom().type = option.type;
      }
    }
  }
}
