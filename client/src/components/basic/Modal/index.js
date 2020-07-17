import Element from "../Element";
import ModalContent from "./ModalContent";
import "./Modal.scss";

export default class Modal extends Element {
  constructor(title, content) {
    super("div", { class: "modal-overlay" });
    this.appendChild(new ModalContent(title, content));

    document.body.appendChild(this.$el);
    this.addEventListener("modalclose", () => {
      this.close();
    });

    this.addEventListener("click", () => {
      this.close();
    });
  }

  close() {
    document.body.removeChild(this.$el);
  }
}
