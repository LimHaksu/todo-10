import Element from "./Element";

export default class H extends Element {
  constructor(level, text, option) {
    if (!level) throw new Error("Specify level");
    if (typeof level !== "number" || !(1 <= level && level <= 6))
      throw new Error("Level should be >=1, <=6");
    super("h" + level, { ...option, text });
    if (!option) return;
    if (option.ondblclick) {
      this.$el.ondblclick = option.ondblclick;
    }
  }
}
