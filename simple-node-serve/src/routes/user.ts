import { Router } from "express";
import { USER_ENDPOINT, USER_MESSAGES } from "../../util/constants";
import { check, validationResult } from "express-validator";
import { User } from "../dal/user";

const router = Router();

router.post(
  USER_ENDPOINT,
  check("username").notEmpty().withMessage(USER_MESSAGES.USERNAME_REQ),
  check("email").notEmpty().withMessage(USER_MESSAGES.EMAIL_REQ),
  check("password").notEmpty().withMessage(USER_MESSAGES.PASSWORD_REQ),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationErrors: Record<string, string> = {};
      errors.array().forEach((err) => {
        if (err.type === "field") {
          validationErrors[err.path] = err.msg;
        }
      });
      
      return res.status(400).send({ validationErrors });
    }

    User.create(req.body);
    res.send({ message: "User registered" });
  }
);

export { router as userRouter };