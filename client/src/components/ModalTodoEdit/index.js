import { Element, Textarea, Modal } from "../basic";
import FormModal from "../FormModal";

export default class ModalTodoEdit extends Modal {
  constructor({ id, initialContent, onEdit }) {
    const contentElement = new Element("div");
    super("Edit note", contentElement);

    this.$textarea = new Textarea({
      placeholder: "Enter a note...",
      name: "content",
    });

    this.$form = new FormModal(
      { inputType: "textarea", initialContent },
      (content) => {
        onEdit(id, content);
      }
    );

    contentElement.appendChild(this.$form);
  }
}
