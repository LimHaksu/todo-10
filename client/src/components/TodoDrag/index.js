import { Element } from "../basic";

class DragPlaceholder extends Element {
  constructor() {
    super("li");
    this.$placeholder = new Element("div", { class: "todo-placeholder" });
    this.$placeholder.setText("place");
    this.appendChild(this.$placeholder);
  }
}

class DragGhost extends Element {}
export default class TodoDragController {
  constructor(dom, offsetX, offsetY) {
    const { top, left } = dom.getBoundingClientRect();
    const { width, height } = dom.style;

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
    ghostNode.style.position = `fixed`;
    ghostNode.style.opacity = `0.5`;
    ghostNode.style.top = `${top}px`;
    ghostNode.style.left = `${left}px`;
    ghostNode.style.zIndex = `9999`;
    ghostNode.style.width = width + "px";
    ghostNode.style.height = height + "px";
    document.body.appendChild(ghostNode);

    const cols = document.querySelectorAll(".column");

    const handleMousemove1 = (evt) => {
      const els = document.elementsFromPoint(evt.clientX, evt.clientY);
      const col = els.filter((node) => node.classList.contains("column"))[0];
      if (!col) return;

      // 가장 가까운 todo의 다음 dom 반환. insertBefore을 사용하기 위해.
      const getClosestYNextDom = (y, domArray) => {
        return domArray.reduce(
          (acc, dom) => {
            const dist = Math.abs(y - dom.getBoundingClientRect().top);
            if (dist < acc[0]) {
              return [dist, dom];
            } else {
              return acc;
            }
          },
          [Infinity, null]
        )[1];
      };

      const closestTodoLi = getClosestYNextDom(
        evt.clientY,
        Array.from(col.querySelectorAll("li"))
      );
      closestTodoLi.parentNode.insertBefore(
        placeholder.getDom(),
        closestTodoLi
      );
    };
    bodyEvents.push(["mousemove", handleMousemove1]);
    document.body.addEventListener("mousemove", handleMousemove1);

    const handleMouseUP = (evt) => {
      const li = document.createElement("li");
      ghostNode.style.position = "static";
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
