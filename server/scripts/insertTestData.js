const sendQueries = require("./sendQueries");

// id idx title userid prev_col
const columns = [
  [1, 1, "col1", 1, null],
  [2, 2, "col2", 1, 1],
  [3, 3, "col3", 1, 2],
  [4, 4, "col3", 1, 3],
];

// id user_id col_id prev_todo content
const todos = [];
let todo_id = 1;
columns.forEach((col) => {
  [1, 2, 3, 4, 5].forEach((i) => {
    todos.push([
      todo_id,
      1,
      col[0],
      todo_id === 1 ? null : todo_id - 1,
      "todo-" + col[0] + "-" + i,
    ]);
    todo_id++;
  });
});

const queries = [
  `INSERT INTO user (id, password, username) VALUES(1, "1234", "admin")`,
  ...columns.map(
    (col) =>
      `INSERT INTO todo_column (id, idx, title, user_id, prev_column_id) VALUES (${col
        .map((a) => {
          if (typeof a === "string") return `"${a}"`;
          else return "" + a;
        })
        .join(", ")})`
  ),
  ...todos.map(
    (todo) =>
      `INSERT INTO todo (id, user_id, column_id, prev_todo_id, content) VALUES (${todo
        .map((a) => {
          if (typeof a === "string") return `"${a}"`;
          else return "" + a;
        })
        .join(", ")})`
  ),
];

sendQueries(queries);
