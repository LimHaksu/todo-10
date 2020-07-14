import "./reset.css";
import Button from "./components/Button";
import Header from "./components/Header";
import List from "./components/List";
import Element from "./components/Element";

const app = new Element("div");
document.getElementById("app").appendChild(app.$el);
const b1 = new Button();

app.appendChild(new Header());
app.appendChild(b1);

const list = new List();
app.appendChild(list);

[1, 2, 3, 4].forEach((n) => {
  const li = document.createElement("li");
  li.innerText = n;
  list.appendChild({ $el: li });
});
