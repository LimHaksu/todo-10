import { H } from "..";
import Button from "../Button";
import Element from "../Element";

export default class ModalContent extends Element {
  constructor(title, content) {
    super("div", { class: "modal-content" });
    const titleH = new H(1, title);

    const closeButton = new Button(
      "X",
      () => {
        const closeEvent = new Event("modalclose", { bubbles: true });
        this.$el.dispatchEvent(closeEvent);
      },
      { class: "reset-button-style" }
    );
    const headerDiv = new Element("div", {
      class: ["flex-spacebetween", "modal-header"],
      children: [titleH, closeButton],
    });
    this.appendChild(headerDiv);

    const contentDiv = new Element("div", {
      class: "modal-content",
      children: content,
    });
    this.appendChild(contentDiv);

    this.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
}
