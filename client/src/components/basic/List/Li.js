export default class Li extends Element {
  constructor(content) {
    super("li");
    super.appendChild(content);
  }
}
