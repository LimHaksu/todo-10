/**
 *
 * @param {*} url
 * @param {*} method
 * @param {*} data
 * @param {Object} data.query
 */
const fetchWrapper = (url, method, data) => {
  const fetchData = { method };
  switch (method.toLowerCase()) {
    case "get":
    case "delete":
      if (data.query) {
        let q = "?";
        for (let key in data.query) {
          q += [key, data.query[key]].map(encodeURIComponent).join("=") + "&";
        }
        url += q;
      }
      break;
    case "put":
    case "post":
    case "patch":
      if (data.body) {
        if (typeof data.body === "object") {
          fetchData.body = JSON.stringify(data.body);
          fetchData.headers = {
            "Content-Type": "application/json",
          };
        } else {
          fetchData.body = body;
        }
      }
      break;
    default:
      throw new Error("Unsupported method: ", method);
  }
  return fetch(url, fetchData).then((res) => {
    if (res.ok) return res.json();
    else {
      throw new Error(res.error);
    }
  });
};

function removeTodoApi(todo_id) {
  return fetchWrapper("/api/todo", "delete", { query: { todo_id } });
}

export default { removeTodoApi };
