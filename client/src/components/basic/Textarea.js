import Element from "./Element";

export default class Textarea extends Element {
  /**
   *
   * @param {{
   *    placeholder : string,
   *    name: string,
   * }} option
   */
  constructor(option) {
    super("textarea", option);
    if (option) {
      if (option.placeholder) {
        this.getDom().placeholder = option.placeholder;
      }
      if (option.name) {
        this.getDom().name = option.name;
      }
    }
  }
}
