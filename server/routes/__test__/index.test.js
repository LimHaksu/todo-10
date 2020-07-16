import request from "supertest";
import app from "../../app";

describe("Test /", () => {
  it("should return world!", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.text).toBe(
          JSON.stringify({
            title: "Express",
          })
        );
        done();
      });
  });
});
