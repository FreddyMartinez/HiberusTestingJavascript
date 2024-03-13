import request from "supertest";
import app from "../src/index";

describe("Signup endpoint", () => {
  it("should return status 200 in root path", () => {
    return request(app).get("/").expect(200);
  });
});
