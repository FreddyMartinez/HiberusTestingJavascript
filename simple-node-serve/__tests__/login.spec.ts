import request from "supertest";
import { LOGIN_URL } from "../util/constants";
import app from "../src/app";
import { USER_MESSAGES } from "../locales/en/common.json";

interface LoginPayload {
  email: string;
  password: string;
}

const loginRequest = (payload: LoginPayload) =>
  request(app).post(LOGIN_URL).send(payload);

describe("Login", () => {
  it.each`
    email                 | password           | status | response
    ${"email@domain.com"} | ${"somePassword1"} | ${200} | ${{ message: USER_MESSAGES.LOGIN_OK }}
    ${"email@domain.com"} | ${null}            | ${400} | ${{ validationErrors: { password: USER_MESSAGES.PASSWORD_REQ } }}
    ${null}               | ${"somePassword1"} | ${400} | ${{ validationErrors: { email: USER_MESSAGES.EMAIL_REQ } }}
  `(
    "should return $status when email is $email and password is $password",
    async ({ email, password, status, response }) => {
      const res = await loginRequest({ email, password });
      expect(res.status).toBe(status);
      expect(res.body).toMatchObject(response);
    }
  );
});
