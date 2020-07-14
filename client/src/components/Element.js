export default class Element {
  constructor(tag, option) {
    this.$el = document.createElement(tag);

    if (!option) return;
    if (option.id) {
      this.$el.id = option.id;
    }

    if (option.class) {
      Array.from(option.calss).forEach(this.$el.classList.add);
    }
  }

  getDom() {
    return this.$el;
  }

  appendChild(el) {
    this.$el.appendChild(el.$el);
  }

  removeChild(el) {
    this.$el.removeChild(el.$el);
  }

  addEventListener(...args) {
    this.$el.addEventListener(...args);
  }

  setText(text) {
    this.$el = textl;
  }
}
