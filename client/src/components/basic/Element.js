export default class Element {
  /**
   *
   * @param {string} tag
   * @param {{id?: string, class?: string | string[], text?: string, children?: Element | Element[]}} option
   */
  constructor(tag, option) {
    this.$el = document.createElement(tag);

    if (!option) return;
    if (option.id) {
      this.$el.id = option.id;
    }

    if (option.class) {
      if (typeof option.class === "string")
        this.$el.classList.add(option.class);
      else Array.from(option.class).forEach((t) => this.$el.classList.add(t));
    }

    if (option.text) {
      this.$el.textContent = option.text;
    }

    if (option.children) {
      const children = option.children;
      if (Array.isArray(children)) {
        children.forEach((element) => this.appendChild(element));
      } else {
        this.appendChild(children);
      }
    }

    this.classList = this.$el.classList;
  }

  getDom() {
    return this.$el;
  }

  appendChild(el) {
    this.$el.appendChild(el.$el);
    return this;
  }

  insertAdjacentElement(...args) {
    this.$el.insertAdjacentElement(...args);
    return this;
  }

  removeChild(el) {
    this.$el.removeChild(el.$el);
    return this;
  }

  addEventListener(...args) {
    this.$el.addEventListener(...args);
    return this;
  }

  removeEventListener(...args) {
    this.$el.removeEventListener(...args);
    return this;
  }

  setText(text) {
    this.$el.textContent = text;
    return this;
  }

  removeSelf() {
    this.getDom().parentNode.removeChild(this.getDom());
  }
}
