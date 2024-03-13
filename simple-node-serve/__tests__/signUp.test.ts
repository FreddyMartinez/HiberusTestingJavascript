import request from "supertest";
import app from "../src/index";
import { USER_ENDPOINT } from "../util/constants";

const user = {
  username: "user",
  email: "email@domain.com",
  password: "somePassword",
};

describe("Signup endpoint", () => {
  it("should return status 200 when request is valid", (done) => {
    request(app)
      .post(USER_ENDPOINT)
      .send(user)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("should return success message when request is valid", async () => {
    const res = await request(app).post(USER_ENDPOINT).send(user);
    expect(res.body).toEqual({ message: "User registered" });
  });

  it.each([
    ["username"],
    ["email"],
    ["password"],
  ])("should return 400 when no %s is sent", async (param, ) => {
    const incompleteUser: Record<string, string> = {...user};
    delete incompleteUser[param];
    const res = await request(app).post(USER_ENDPOINT).send(incompleteUser);
    expect(res.status).toBe(400);
  });
});
