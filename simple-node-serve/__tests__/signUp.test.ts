import request from "supertest";
import app from "../src/app";
import { USER_ENDPOINT } from "../util/constants";
import dbInstance from "../src/dal/dabInstance";
import { User } from "../src/dal/user";
import { USER_MESSAGES } from "../locales/en/common.json";
import { USER_MESSAGES as SPANISH_MESSAGES } from "../locales/es/common.json";
import * as email from "../src/services/email";
import { SMTPServer } from "smtp-server";

const user = {
  username: "user",
  email: "email@domain.com",
  password: "somePassword1",
};

let lastEmail = "";
let server: SMTPServer;

const setupSMTPServer = () => {
  server = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
      let message = "";
      stream.on("data", (data) => {
        message += data;
      });
      stream.on("end", () => {
        lastEmail = message;
        callback();
      });
    },
  });

  server.listen(8081, () => {
    console.log("SMTP server started on port 8081");
  });
};

const userPostRequest = (payload: Record<string, unknown>) =>
  request(app).post(USER_ENDPOINT).send(payload);

beforeAll(async () => {
  setupSMTPServer();
  await dbInstance.sync();
});

beforeEach(async () => {
  await User.destroy({ truncate: true });
});

afterAll(() => {
  server.close();
});

describe("Signup endpoint", () => {
  it("should return status 200 when request is valid", (done) => {
    userPostRequest(user).then((res) => {
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
      username: USER_MESSAGES.USERNAME_REQ,
      email: USER_MESSAGES.EMAIL_REQ,
      password: USER_MESSAGES.PASSWORD_REQ,
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

  it.each`
    param         | error                          | value               | message
    ${"username"} | ${"has less than 4 chars"}     | ${"abc"}            | ${USER_MESSAGES.USERNAME_MIN_LENGTH}
    ${"username"} | ${"exceeds 30 chars"}          | ${"a".repeat(31)}   | ${USER_MESSAGES.USERNAME_MAX_LENGTH}
    ${"email"}    | ${"is not valid email"}        | ${"abcd"}           | ${USER_MESSAGES.EMAIL_NOT_VALID}
    ${"password"} | ${"has less than 4 chars"}     | ${"123"}            | ${USER_MESSAGES.PASSWORD_TO_SHORT}
    ${"password"} | ${"has less than 1 uppercase"} | ${"123dd"}          | ${USER_MESSAGES.PASSWORD_REQUIREMENTS}
    ${"password"} | ${"has less than 1 lowercase"} | ${"123DD"}          | ${USER_MESSAGES.PASSWORD_REQUIREMENTS}
    ${"password"} | ${"has less than 1 number"}    | ${"AADDEFVVRsdswe"} | ${USER_MESSAGES.PASSWORD_REQUIREMENTS}
  `(
    "Should return an error when $param $error",
    async ({ param, value, message }) => {
      const invalidUser = { ...user, [param]: value };
      const res = await userPostRequest(invalidUser);
      expect(res.statusCode).toBe(400);
      expect(res.body).toMatchObject({
        validationErrors: { [param]: message },
      });
    }
  );

  it("Should return an error if email already exist", async () => {
    let res = await userPostRequest(user);
    expect(res.statusCode).toBe(200);
    res = await userPostRequest(user);
    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({
      validationErrors: { email: USER_MESSAGES.EMAIL_EXISTS },
    });
  });
});

describe("Signup endpoint in spanish", () => {
  const userPostRequestSpanish = (payload: Record<string, unknown>) =>
  request(app).post(USER_ENDPOINT).set("accept-language", "es").send(payload);

  it.each`
    param         | error                          | value               | message
    ${"username"} | ${"is null"}                   | ${""}               | ${SPANISH_MESSAGES.USERNAME_REQ}
    ${"username"} | ${"has less than 4 chars"}     | ${"abc"}            | ${SPANISH_MESSAGES.USERNAME_MIN_LENGTH}
    ${"username"} | ${"exceeds 30 chars"}          | ${"a".repeat(31)}   | ${SPANISH_MESSAGES.USERNAME_MAX_LENGTH}
    ${"email"}    | ${"is null"}                   | ${""}               | ${SPANISH_MESSAGES.EMAIL_REQ}
    ${"email"}    | ${"is not valid email"}        | ${"abcd"}           | ${SPANISH_MESSAGES.EMAIL_NOT_VALID}
    ${"password"} | ${"is null"}                   | ${""}               | ${SPANISH_MESSAGES.PASSWORD_REQ}
    ${"password"} | ${"has less than 4 chars"}     | ${"123"}            | ${SPANISH_MESSAGES.PASSWORD_TO_SHORT}
    ${"password"} | ${"has less than 1 uppercase"} | ${"123dd"}          | ${SPANISH_MESSAGES.PASSWORD_REQUIREMENTS}
    ${"password"} | ${"has less than 1 lowercase"} | ${"123DD"}          | ${SPANISH_MESSAGES.PASSWORD_REQUIREMENTS}
    ${"password"} | ${"has less than 1 number"}    | ${"AADDEFVVRsdswe"} | ${SPANISH_MESSAGES.PASSWORD_REQUIREMENTS}
  `(
    "Should return an error when $param $error",
    async ({ param, value, message }) => {
      const invalidUser = { ...user, [param]: value };
      const res = await userPostRequestSpanish(invalidUser);
      expect(res.statusCode).toBe(400);
      expect(res.body).toMatchObject({
        validationErrors: { [param]: message },
      });
    }
  );
});

describe("Signup endpoint email", () => {
  it("should create a user as inactive", async () => {
    await userPostRequest({...user, active: true});
    const users = await User.findAll();
    const lastUser = users[0];
    expect(lastUser.active).toBe(false);
  });

  it("should create an activation token", async () => {
    await userPostRequest(user);
    const users = await User.findAll();
    const lastUser = users[0];
    expect(lastUser.activationToken).toBeTruthy();
  });

  it("should send an email with activation token", async() => {
    await userPostRequest(user);
    expect(lastEmail).toContain(user.email);
    const users = await User.findAll();
    const lastUser = users[0];
    expect(lastEmail).toContain(lastUser.activationToken);
  });

  it("should return an error message when email is not sent and not save user", async () => {
    const mockSendEmail = jest.spyOn(email, "sendEmail").mockRejectedValue({ message: "Email failed"});

    const response = await userPostRequest(user);
    expect(response.status).toBe(502);
    expect(response.body).toEqual({ message: USER_MESSAGES.ERROR_SENDING_EMAIL });
    const users = await User.findAll();
    expect(users.length).toBe(0);
    mockSendEmail.mockRestore();
  });
});
