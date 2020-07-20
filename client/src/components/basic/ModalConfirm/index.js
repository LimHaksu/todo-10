import Modal from "../Modal";
import Element from "../Element";
import Button from "../Button";

export default class ModalConfirm extends Modal {
  constructor(onConfirm) {
    const contentDiv = new Element("div");
    super("정말로 삭제하시겠습니까?", contentDiv);

    const confirmButton = new Button("확인", () => {
      this.close.bind(this)();
      onConfirm();
    });
    const cancelButton = new Button("취소", this.close.bind(this));
    contentDiv.appendChild(confirmButton);
    contentDiv.appendChild(cancelButton);
  }
}
