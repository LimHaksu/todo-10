import { Element, H } from "../basic";
import Modal from "../basic/Modal";
import Button from "../basic/Button";
import TextArea from "../basic/TextArea";

export default class ModalTodoEdit extends Modal {
  constructor({ id, content, onEdit }) {
    const contentElement = new Element("div");
    super("Edit note", contentElement);

    this.$form = new Element("form", { class: "form" });
    this.$form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      onEdit(evt);
      const closeEvent = new Event("modalclose", { bubbles: true });
      this.$el.dispatchEvent(closeEvent);
    });

    this.$textarea = new TextArea({
      placeholder: "Enter a note...",
      name: "content",
    });
    this.$textarea.$el.value = content;

    this.$submitButton = new Button("Save note", null, {
      class: ["button-form", "button-green"],
    });

    this.$form.appendChild(new H(3, "Note"));
    this.$form.appendChild(this.$textarea);
    this.$form.appendChild(this.$submitButton);

    contentElement.appendChild(this.$form);
  }
}
