import Log from "../Log";
import { getByText } from "@testing-library/dom";

describe("Log", () => {
  it("renders properly", () => {
    const log = new Log({ todoContent: "test log" });
    getByText(log.getDom(), "test log");
  });
});
