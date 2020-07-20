import { Element } from "../basic";
import DragPlaceholder from "./DragPlaceholder";
import "./TodoDrag.css";

export default class TodoDragController {
  constructor(dom, offsetX, offsetY) {
    const { top, left } = dom.getBoundingClientRect();

    const placeholder = new DragPlaceholder();
    dom.parentNode.parentNode.insertBefore(
      placeholder.getDom(),
      dom.parentNode
    );

    let bodyEvents = [];
    dom.parentNode.remove(); // remove li from column;
    const handleMousemove = (evt) => {
      dom.style.top = `${evt.clientY - offsetY}px`;
      dom.style.left = `${evt.clientX - offsetX}px`;
    };
    bodyEvents.push(["mousemove", handleMousemove]);
    document.body.addEventListener("mousemove", handleMousemove);

    const ghostNode = dom;

    ghostNode.classList.add("ghost-todo");
    ghostNode.classList.remove("todo");
    ghostNode.style.top = `${top}px`;
    ghostNode.style.left = `${left}px`;
    document.body.appendChild(ghostNode);

    const handleMousemove1 = (evt) => {
      const els = document.elementsFromPoint(evt.clientX, evt.clientY);
      const col = els.filter((node) => node.classList.contains("column"))[0];
      if (!col) return;

      // 가장 가까운 todo의 다음 dom 반환. insertBefore을 사용하기 위해.
      /**
       *
       * @param {number} y
       * @param {HTMLElement[]} domArray
       * @returns null | HTMLElement
       */
      const getClosestYNextDom = (y, domArray) => {
        let cloesestDom = null;
        domArray.some((dom) => {
          const rectOfDom = dom.getBoundingClientRect();
          const middleOfDom = (rectOfDom.top + rectOfDom.bottom) / 2;
          if (middleOfDom < y) {
            cloesestDom = dom;
          } else {
            return true; // some에서 return true는 break 처럼 동작
          }
        });
        return cloesestDom;
      };

      const closestBeforeTodoLi = getClosestYNextDom(
        evt.clientY,
        Array.from(col.querySelectorAll("li"))
      );

      if (!closestBeforeTodoLi) {
        col
          .querySelector("ol")
          .insertAdjacentElement("afterbegin", placeholder.getDom());
      } else {
        closestBeforeTodoLi.insertAdjacentElement(
          "afterend",
          placeholder.getDom()
        );
      }
    };
    bodyEvents.push(["mousemove", handleMousemove1]);
    document.body.addEventListener("mousemove", handleMousemove1);

    const handleMouseUP = (evt) => {
      ghostNode.classList.remove("ghost-todo");
      ghostNode.classList.add("todo");

      const li = document.createElement("li");
      li.appendChild(ghostNode);
      placeholder.getDom().parentNode.insertBefore(li, placeholder.getDom());
      placeholder.getDom().remove();
      bodyEvents.forEach(([evtname, fn]) => {
        document.body.removeEventListener(evtname, fn);
      });
    };
    bodyEvents.push(["mouseup", handleMouseUP]);
    document.body.addEventListener("mouseup", handleMouseUP);
  }
}
