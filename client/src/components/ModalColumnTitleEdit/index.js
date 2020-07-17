import { Element, Modal, Input } from "../basic";
import ColumnTitleEditForm from "./ColumnTitleEditForm";

export default class ModalColumnTitleEdit extends Modal {
  constructor(columnTitle) {
    const columnTitleEditForm = new ColumnTitleEditForm(columnTitle);
    super(`Edit ${columnTitle}`, columnTitleEditForm);
  }
}
