import api from "../../lib/apiCallWrapper";
import LogEvent from "../../lib/LogEvent";
import "./TodoDrag.css";

function setDomTopLeft(dom, top, left) {
  dom.style.top = `${top}px`;
  dom.style.left = `${left}px`;
}

function getColumnFromPoint(clientX, clientY) {
  const els = document.elementsFromPoint(clientX, clientY);
  const column = els.filter((node) => node.classList.contains("column"))[0];
  return column;
}

// y 좌표가 y보다 위에 있는 li중 마지막 li의 index와 dom 반환
function getClosestLi(y, columns) {
  let idx = 1;
  let closestDom = null;
  const domArray = columns.querySelectorAll("li");
  for (let dom of domArray) {
    const { top, bottom } = dom.getBoundingClientRect();
    const middle = (top + bottom) / 2;
    if (middle > y) break;
    idx++;
    closestDom = dom;
  }
  return { idx, dom: closestDom };
}

function getHandleMousemoveForPlaceHolder(placeholder) {
  return (evt) => {
    const col = getColumnFromPoint(evt.clientX, evt.clientY);
    if (!col) return;

    const closestBeforeTodoLi = getClosestLi(evt.clientY, col).dom;

    if (!closestBeforeTodoLi) {
      col.querySelector("ol").insertAdjacentElement("afterbegin", placeholder);
    } else {
      closestBeforeTodoLi.insertAdjacentElement("afterend", placeholder);
    }
  };
}

function getHandleMousemove(dom, offsetX, offsetY) {
  return (evt) => {
    setDomTopLeft(dom, evt.clientY - offsetY, evt.clientX - offsetX);
  };
}

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
      const nextIdx = getClosestLi(evt.clientY, col).idx;
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
