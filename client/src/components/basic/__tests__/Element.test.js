import Element from "../Element";
import { getByText, queryByText, fireEvent } from "@testing-library/dom";

describe("Element", () => {
  it("creates dom correctly with options", () => {
    const el = new Element("tag", {
      id: "tagid",
      class: ["class1", "class2"],
      text: "text",
    });
    getByText(el.getDom(), "text");
    expect(el.getDom().tagName).toBe("tag".toUpperCase());
    expect(el.getDom().id).toBe("tagid");
    expect(Object.values(el.getDom().classList)).toEqual(["class1", "class2"]);
  });

  it("appends and removes child", () => {
    const el = new Element("div");
    const el1 = new Element("div", { text: "1" });
    const el2 = new Element("div", { text: "2" });

    el.appendChild(el1);
    el.appendChild(el2);
    getByText(el.getDom(), "1");
    getByText(el.getDom(), "2");

    el.removeChild(el1);
    const testEl = queryByText(el.getDom(), "1");
    expect(testEl).toBe(null);
  });

  it("sets text", () => {
    const el = new Element("div");
    el.setText("1");

    getByText(el.getDom(), "1");
  });

  it("adds and removes event listener", () => {
    const fn = jest.fn();
    const el = new Element("div");

    el.addEventListener("click", fn);
    fireEvent.click(el.getDom());
    expect(fn).toBeCalled();

    el.removeEventListener("click", fn);
    fireEvent.click(el.getDom());
    expect(fn).toBeCalledTimes(1);
  });
});
