export default (req, res) => {
  const username = "circle";
  let result = [];
  result.push({
    id: 1,
    idx: 1,
    title: "Todos",
    username,
    prev_column_id: 0,
    todo_list: [
      {
        id: 1,
        username,
        column_id: 1,
        prev_todo_id: null,
        content: "todo1",
        created_at: "now",
        updated_at: "tom",
      },
      {
        id: 2,
        username,
        column_id: 1,
        prev_todo_id: null,
        content: "todo2",
        created_at: "now",
        updated_at: "tom",
      },
      {
        id: 3,
        username,
        column_id: 1,
        prev_todo_id: null,
        content: "todo3",
        created_at: "now",
        updated_at: "tom",
      },
    ],
    created_at: "now",
    updated_at: "tow",
  });
  result.push({
    id: 2,
    idx: 2,
    title: "Doing",
    username,
    prev_column_id: 1,
    todo_list: [
      {
        id: 4,
        username,
        column_id: 2,
        prev_todo_id: null,
        content: "todo11",
        created_at: "now",
        updated_at: "tom",
      },
      {
        id: 5,
        username,
        column_id: 2,
        prev_todo_id: null,
        content: "todo21",
        created_at: "now",
        updated_at: "tom",
      },
      {
        id: 6,
        username,
        column_id: 2,
        prev_todo_id: null,
        content: "todo32",
        created_at: "now",
        updated_at: "tom",
      },
    ],
    created_at: "now",
    updated_at: "tow",
  });
  res.json({ result });
};
