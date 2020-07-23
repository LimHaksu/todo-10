import api from "../../lib/apiCallWrapper";
import "./TodoDrag.css";

const setDomTopLeft = (dom, top, left) => {
  dom.style.top = `${top}px`;
  dom.style.left = `${left}px`;
};

/**
 * y 좌표 위 todo 중 y 좌표와 가장 가까운 todo의 dom 반환.
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

const getHandleMousemoveForPlaceHolder = (placeholder) => {
  return (evt) => {
    const els = document.elementsFromPoint(evt.clientX, evt.clientY);
    const col = els.filter((node) => node.classList.contains("column"))[0];
    if (!col) return;

    const closestBeforeTodoLi = getClosestYNextDom(
      evt.clientY,
      Array.from(col.querySelectorAll("li"))
    );

    if (!closestBeforeTodoLi) {
      col.querySelector("ol").insertAdjacentElement("afterbegin", placeholder);
    } else {
      closestBeforeTodoLi.insertAdjacentElement("afterend", placeholder);
    }
  };
};

const getHandleMousemove = (dom, offsetX, offsetY) => {
  return (evt) => {
    setDomTopLeft(dom, evt.clientY - offsetY, evt.clientX - offsetX);
  };
};

const getHandleMouseUp = (ghostNode, placeholder, bodyEvents) => {
  return (evt) => {
    ghostNode.classList.remove("ghost-todo");
    ghostNode.classList.add("todo");

    const li = document.createElement("li");
    li.appendChild(ghostNode);
    placeholder.parentNode.insertBefore(li, placeholder);
    placeholder.remove();
    bodyEvents.forEach(([evtname, fn]) => {
      document.body.removeEventListener(evtname, fn);
    });
  };
};

export default class TodoDrag {
  constructor(dom, offsetX, offsetY) {
    const { top, left, right } = dom.getBoundingClientRect();
    dom.style.width = `${right - left}px`;

    const placeholder = dom.cloneNode(true);
    placeholder.classList.add("todo-place-holder");
    dom.parentNode.parentNode.insertBefore(placeholder, dom.parentNode);

    let bodyEvents = [];
    dom.parentNode.remove(); // remove li from column;

    const handleMousemove = getHandleMousemove(dom, offsetX, offsetY);
    bodyEvents.push(["mousemove", handleMousemove]);
    document.body.addEventListener("mousemove", handleMousemove);

    const ghostNode = dom;

    ghostNode.classList.add("ghost-todo");
    ghostNode.classList.remove("todo");
    setDomTopLeft(ghostNode, top, left);

    document.body.appendChild(ghostNode);

    const handleMousemoveForPlaceHolder = getHandleMousemoveForPlaceHolder(
      placeholder
    );
    bodyEvents.push(["mousemove", handleMousemoveForPlaceHolder]);
    document.body.addEventListener("mousemove", handleMousemoveForPlaceHolder);

    const handleMouseUp = getHandleMouseUp(ghostNode, placeholder, bodyEvents);
    bodyEvents.push(["mouseup", handleMouseUp]);
    document.body.addEventListener("mouseup", handleMouseUp);
  }
}
