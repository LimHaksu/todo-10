import Column from "../Column";
import { getByText } from "@testing-library/dom";

describe("Column 마크업 확인", () => {
  it("renders properly", () => {
    const column = new Column({ title: "column" });
    getByText(column.getDom(), "column");
  });
});
