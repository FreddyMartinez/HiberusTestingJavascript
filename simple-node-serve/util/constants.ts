const API_V1 = "/api/v1";
export const USER_ENDPOINT = API_V1 + "/users";

export const USER_MESSAGES = {
  USERNAME_REQ: "username is required",
  EMAIL_REQ: "email is required",
  PASSWORD_REQ: "password is required",
  USERNAME_MIN_LENGTH: "Username must be at least 4 chars",
  USERNAME_MAX_LENGTH: "Username cannot exceed 30 chars",
  EMAIL_NOT_VALID: "Email does not match email pattern",
  PASSWORD_TO_SHORT: "The password has less than 4 chars",
  PASSWORD_REQUIREMENTS: "The password need at least one lowercase, one uppercase and one number",
  EMAIL_EXISTS: "Email already exists in database",
};
