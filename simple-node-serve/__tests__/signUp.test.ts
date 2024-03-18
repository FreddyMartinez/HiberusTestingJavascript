import request from "supertest";
import app from "../src/app";
import { USER_ENDPOINT, USER_MESSAGES } from "../util/constants";

const user = {
  username: "user",
  email: "email@domain.com",
  password: "somePassword",
};

const userPostRequest = (payload: Record<string, unknown>) => request(app).post(USER_ENDPOINT).send(payload); 

describe("Signup endpoint", () => {
  it("should return status 200 when request is valid", (done) => {
    userPostRequest(user)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("should return success message when request is valid", async () => {
    const res = await userPostRequest(user);
    expect(res.body).toEqual({ message: "User registered" });
  });

  it.each([
    ["username", USER_MESSAGES.USERNAME_REQ],
    ["email", USER_MESSAGES.EMAIL_REQ],
    ["password", USER_MESSAGES.PASSWORD_REQ],
  ])(
    "should return 400 with message when no %s is sent",
    async (param, message) => {
      const incompleteUser: Record<string, string> = { ...user };
      delete incompleteUser[param];
      const res = await userPostRequest(incompleteUser);
      expect(res.status).toBe(400);
      const validationErrors: Record<string, string> = {};
      validationErrors[param] = message;
      expect(res.body).toEqual({ validationErrors });
    }
  );

  it("Should return validation errors when several params are missing", async () => {
    const emptyUser = {};
    const res = await userPostRequest(emptyUser);
    const validationErrors: Record<string, string> = {
      username: "username is required",
      email: "email is required",
      password: "password is required",
    };
    expect(res.body).toEqual({ validationErrors });
  });

  it("Should save user in database", async () => {

  });
});
