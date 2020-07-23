import Modal from "../Modal";
import Element from "../Element";
import Button from "../Button";
import "./ModalConfirm.scss";

export default class ModalConfirm extends Modal {
  constructor(onConfirm) {
    const contentDiv = new Element("div", {
      class: ["modal-confirm", "flex-spacebetween"],
    });
    super("정말로 삭제하시겠습니까?", contentDiv);

    const confirmButton = new Button(
      "확인",
      () => {
        this.close.bind(this)();
        onConfirm();
      },
      { class: ["button-form", "button-green"] }
    );
    const cancelButton = new Button("취소", this.close.bind(this), {
      class: ["button-form", "button-grey"],
    });
    contentDiv.appendChild(confirmButton);
    contentDiv.appendChild(cancelButton);
  }
}
