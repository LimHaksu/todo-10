import api from "../../lib/apiCallWrapper";
import LogEvent from "../../lib/LogEvent";
import "./TodoDrag.css";

const setDomTopLeft = (dom, top, left) => {
  dom.style.top = `${top}px`;
  dom.style.left = `${left}px`;
};

const getColumnFromPoint = (clientX, clientY) => {
  const els = document.elementsFromPoint(clientX, clientY);
  const column = els.filter((node) => node.classList.contains("column"))[0];
  return column;
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

const getNextIdx = (y, col) => {
  let idx = 1;
  const domArray = Array.from(col.querySelectorAll("li"));
  domArray.some((dom) => {
    const rectOfDom = dom.getBoundingClientRect();
    const middleOfDom = (rectOfDom.top + rectOfDom.bottom) / 2;
    if (middleOfDom < y) {
      idx++;
    } else {
      return true; // some에서 return true는 break 처럼 동작
    }
  });
  return idx;
};

const getHandleMousemoveForPlaceHolder = (placeholder) => {
  return (evt) => {
    const col = getColumnFromPoint(evt.clientX, evt.clientY);
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

    const handleMouseUp = this.getHandleMouseUp(
      ghostNode,
      placeholder,
      bodyEvents
    );
    bodyEvents.push(["mouseup", handleMouseUp]);
    document.body.addEventListener("mouseup", handleMouseUp);
  }

  getHandleMouseUp(ghostNode, placeholder, bodyEvents) {
    return async (evt) => {
      ghostNode.classList.remove("ghost-todo");
      ghostNode.classList.add("todo");

      const { x, y } = placeholder.getBoundingClientRect();
      const col = getColumnFromPoint(x, y);
      const todoId = ghostNode.todoId;
      const nextColumnId = col.columnId;
      const nextIdx = getNextIdx(evt.clientY, col);
      const response = await api.moveTodoApi(todoId, nextIdx, nextColumnId);

      if (response) {
        const logEvent = new LogEvent("todo_move", {
          logId: response.log_id,
          todoId: response.todo_id,
          prevColumnContent: response.prev_column_content,
          nextColumnContent: response.next_column_content,
          todoContent: response.todo_content,
          username: response.username,
          createdAt: response.created_at,
        });
        placeholder.dispatchEvent(logEvent);
      }

      const li = document.createElement("li");
      li.appendChild(ghostNode);
      placeholder.parentNode.insertBefore(li, placeholder);
      placeholder.remove();
      bodyEvents.forEach(([evtname, fn]) => {
        document.body.removeEventListener(evtname, fn);
      });
      const columns = document.querySelectorAll(".column");
      Array.from(columns).forEach((column) => {
        column.$ref.refreshCount();
      });
    };
  }
}
