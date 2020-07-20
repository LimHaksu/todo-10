export default class LogEvent extends CustomEvent {
  constructor(type, data) {
    super("log", { bubbles: true, detail: { type, data } });
  }
}
