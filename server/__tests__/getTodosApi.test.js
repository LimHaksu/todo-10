const request = require("supertest");
const app = require("../app");

describe("GET /api/todos", () => {
  const server = request(app);
  it("gives todos", (done) => {
    server
      .get("/api/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (res.body) return done();
      });
  });
});
