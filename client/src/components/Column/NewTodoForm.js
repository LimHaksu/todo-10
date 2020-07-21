import { Element, Textarea, Button } from "../basic";
import "../global.scss";

const handleAddButtonClick = (event) => {
  event.preventDefault();
};
const handleCancelButtonClick = (event) => {
  event.preventDefault();
};

export default class NewTodoForm extends Element {
  constructor() {
    super("form", { class: ["form", "display-none"] });

    this.$textarea = new Textarea({
      name: "todo-content",
      placeholder: "Enter a note",
    });
    this.appendChild(this.$textarea);

    const buttonWrapper = new Element("div", { class: "flex-spacebetween" });
    this.appendChild(buttonWrapper);
    this.$addButton = new Button("Add", handleAddButtonClick, {
      class: ["button-form", "button-green"],
      type: "submit",
    });
    this.$cancelButton = new Button("Cancel", handleCancelButtonClick, {
      class: ["button-form", "button-grey"],
    });
    buttonWrapper.appendChild(this.$addButton);
    buttonWrapper.appendChild(this.$cancelButton);
  }
}
