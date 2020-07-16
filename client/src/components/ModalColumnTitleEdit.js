import { Element, Modal, Input } from "./basic";

class ColumnTitleEditForm extends Element {
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

export default class ModalColumnTitleEdit extends Modal {
  constructor(columnTitle) {
    const columnTitleEditForm = new ColumnTitleEditForm(columnTitle);
    super(`Edit ${columnTitle}`, columnTitleEditForm);
  }
}
