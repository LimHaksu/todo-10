export default class Element {
  constructor(tag, option) {
    this.$el = document.createElement(tag);

    if (!option) return;
    if (option.id) {
      this.$el.id = option.id;
    }

    if (option.class) {
      Array.from(option.class).forEach((t) => this.$el.classList.add(t));
    }

    if (option.text) {
      this.$el.textContent = option.text;
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

  removeEventListener(...args) {
    this.$el.removeEventListener(...args);
  }

  setText(text) {
    this.$el.textContent = text;
  }
}
