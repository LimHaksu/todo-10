import { Element, H, Input, Textarea } from "../basic";
import Button from "../basic/Button";

export default class Form extends Element {
  /**
   *
   * @param {{
   *  inputType : 'input' | 'textarea',
   *  initialContent : string
   * }} option
   * @param {*} onSubmit
   */
  constructor({ inputType, initialContent }, onSubmit) {
    super("form", { class: "form" });
    this.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const content =
        this.$inputContent.getDom().value ||
        this.$inputContent.getDom().textContent;

      onSubmit(content);
      const closeEvent = new Event("modalclose", { bubbles: true });
      this.$el.dispatchEvent(closeEvent);
    });

    switch (inputType) {
      case "input":
        this.$inputContent = new Input();
        this.$inputContent.getDom().value = initialContent;
        break;
      case "textarea":
        this.$inputContent = new Textarea();
        this.$inputContent.setText(initialContent);
        break;
      default:
        throw new Error("Invalid Form Element");
    }

    this.$submitButton = new Button("Save note", null, {
      class: ["button-form", "button-green"],
    });

    this.appendChild(new H(3, "Note"));
    this.appendChild(this.$inputContent);
    this.appendChild(this.$submitButton);
  }
}
