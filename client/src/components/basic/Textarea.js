import Element from "./Element";

export default class TextArea extends Element {
  /**
   *
   * @param {{
   *    placeholder : string,
   * }} option
   */
  constructor(option) {
    super("textarea", option);

    if (option.placeholder) {
      this.getDom().placeholder = option.placeholder;
    }
  }
}
