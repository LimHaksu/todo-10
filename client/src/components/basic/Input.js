import Element from "./Element";

export default class Input extends Element {
  /**
   *
   * @param {string | Element} content - Button text
   * @param {{
   *    placeholder : string
   *    type : 'text' | 'checkbox' | 'password'
   * }} option
   */
  constructor(option) {
    super("input", option);

    if (option.placeholder) {
      this.getDom().placeholder = option.placeholder;
    }
    if (option.type) {
      this.getDom().type = option.type;
    }
  }
}
