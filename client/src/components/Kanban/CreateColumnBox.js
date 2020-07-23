import { Element, Modal, Input } from "../basic";
import FormModal from "../FormModal";
import "./CreateColumnBox.css";

class CreateColumnModal extends Modal {
  constructor({ onEdit }) {
    const contentElement = new Element("div");
    super(`Add a Column`, contentElement);

    this.$form = new FormModal(
      { inputType: "input", initialContent: "" },
      onEdit
    );

    contentElement.appendChild(this.$form);
  }
}

export default class CreateColumnBox extends Element {
  constructor() {
    super("div", {
      class: ["create-column-box", "margin1"],
      text: "Add a Column",
    });

    const createColumn = () => {
      new CreateColumnModal({
        onEdit: (content) => {
          alert(content);
        },
      });
    };

    this.addEventListener("click", createColumn);
  }
}
