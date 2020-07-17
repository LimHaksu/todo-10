import { Element, Modal, Input } from "../basic";
import FormModal from "../FormModal";

export default class ModalColumnTitleEdit extends Modal {
  constructor({ id, columnTitle, onEdit }) {
    const contentElement = new Element("div");
    super(`Edit ${columnTitle}`, contentElement);

    this.$input = new Input();

    this.$form = new FormModal(
      { inputType: "input", initialContent: columnTitle },
      (content) => {
        onEdit(id, content);
      }
    );

    contentElement.appendChild(this.$form);
  }
}
