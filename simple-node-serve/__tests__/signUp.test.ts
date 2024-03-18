import request from "supertest";
import app from "../src/app";
import { USER_ENDPOINT, USER_MESSAGES } from "../util/constants";
import dbInstance from "../src/dal/dabInstance";
import { User } from "../src/dal/user";

const user = {
  username: "user",
  email: "email@domain.com",
  password: "somePassword",
};

const userPostRequest = (payload: Record<string, unknown>) => request(app).post(USER_ENDPOINT).send(payload); 

beforeAll(async () => {
  await dbInstance.sync();
});

beforeEach(async () => {
  await User.destroy({ truncate: true });
});

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
    await userPostRequest(user);
    const users = await User.findAll({ where: { email: user.email } });
    expect(users.length).toBe(1);
  });
  
  it("Should save password as a hash", async () => {
    await userPostRequest(user);
    const users = await User.findAll({ where: { email: user.email } });
    expect(users.length).toBe(1);
    const savedUser = users[0];
    expect(savedUser.password).not.toBe(user.password);
  });
});
