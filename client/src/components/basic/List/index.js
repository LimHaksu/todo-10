import Element from "../Element";
import Li from "./Li";

export default class List extends Element {
  constructor(ordered = true, option = null) {
    super(ordered ? "ol" : "ul", option);
    this.$list = {}; //[Li, custom Element]
  }

  getCount() {
    return Object.keys(this.$list).length;
  }

  push(key, element) {
    if (!(typeof key === "string" || typeof key === "number")) {
      throw new Error("Key should be a string or a number.");
    }

    if (this.$list[key]) {
      throw new Error("Duplicated key: ", key);
    }

    const li = new Li(element);
    this.$list[key] = li;
    Element.prototype.appendChild.bind(this)(li);
  }

  remove(key) {
    if (this.$list[key]) {
      Element.prototype.removeChild.bind(this)(this.$list[key]);
      delete this.$list[key];
    }
  }

  appendChild() {
    throw new Error("Please use push");
  }

  removeChild() {
    throw new Error("Please use remove");
  }
}
