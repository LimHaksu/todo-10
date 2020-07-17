export default class ColumnTitleEditForm extends Element {
  /**
   *
   * @param {string} columnTitle
   */
  constructor(columnTitle) {
    super("form");
    this.$input = new Input(columnTitle);
    this.appendChild(this.$input);
  }
}
