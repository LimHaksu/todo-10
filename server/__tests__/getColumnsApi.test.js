const request = require("supertest");
const app = require("../app");

describe("GET /api/columns", () => {
  const server = request(app);
  it("gives user columns", (done) => {
    server
      .get("/api/columns")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({
        result: [{ column_id: 1, title: "column" }],
      })
      .end((err, res) => {
        if (err) return done(err);
        if (res.body) {
          return done();
        }
      });
  });
});
