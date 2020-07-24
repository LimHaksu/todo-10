import Element from "../basic/Element";
import "./Header.scss";
import H from "../basic/H";
import Button from "../basic/Button";

export default class Header extends Element {
  constructor() {
    super("header", { class: ["header"] });
    this.appendChild(new H(1, "ㅌㄷㄷㅌ", { class: "logo" }));
    this.appendChild(
      new Button(new H(2, "Menu"), (evt) => {
        this.getDom().dispatchEvent(
          new CustomEvent("show-menu", { bubbles: true })
        );
      })
    );
  }
}
