const request = require("supertest");
const app = require("../app");

describe("GET /api/todos", () => {
  const server = request(app);
  it("requires column_id", (done) => {
    server
      .get("/api/todos")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body) {
          expect(res.body.error).toBeTruthy();
          return done();
        }
      });
  });

  it("gives todos", (done) => {
    server
      .get("/api/todos?columns=1")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({
        result: [
          {
            column_id: 1,
            todos: [
              { id: 1, username: "user1", content: "todo1" },
              { id: 2, username: "user1", content: "todo2" },
            ],
          },
        ],
      })
      .end((err, res) => {
        if (err) return done(err);
        if (res.body) return done();
      });
  });
});
