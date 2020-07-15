import Button from "../Button";
import { getByText, fireEvent } from "@testing-library/dom";

describe("Button", () => {
  it("renders properly", () => {
    const button = new Button("btnn");
    getByText(button.getDom(), "btnn");
  });

  it("can also set Element", () => {
    const el = new Button("btnn");
    const button = new Button(el);
    getByText(button.getDom(), "btnn");
  });

  it("can take onClick", () => {
    const onClick = jest.fn();
    const button = new Button("btnn", onClick);
    fireEvent.click(button.$el);
    expect(onClick).toBeCalled();
  });
});
