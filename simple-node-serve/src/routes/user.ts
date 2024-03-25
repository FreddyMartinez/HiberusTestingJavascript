import { Router } from "express";
import { USER_ENDPOINT } from "../../util/constants";
import { check, validationResult } from "express-validator";
import { User } from "../dal/user";
import { saveUser, emailExistsInBd } from "../bll/user";
import { EmailError } from "../../util/errors";

const router = Router();

router.post(
  USER_ENDPOINT,
  check("username")
    .notEmpty()
    .withMessage("USER_MESSAGES.USERNAME_REQ")
    .bail()
    .isLength({ min: 4 })
    .withMessage("USER_MESSAGES.USERNAME_MIN_LENGTH")
    .bail()
    .isLength({ max: 30 })
    .withMessage("USER_MESSAGES.USERNAME_MAX_LENGTH"),
  check("email")
    .notEmpty()
    .withMessage("USER_MESSAGES.EMAIL_REQ")
    .bail()
    .isEmail()
    .withMessage("USER_MESSAGES.EMAIL_NOT_VALID")
    .bail()
    .custom(async (email) => {
      const userExists = await emailExistsInBd(email);
      if (userExists) {
        throw new Error("USER_MESSAGES.EMAIL_EXISTS");
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("USER_MESSAGES.PASSWORD_REQ")
    .bail()
    .isLength({ min: 4 })
    .withMessage("USER_MESSAGES.PASSWORD_TO_SHORT")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage("USER_MESSAGES.PASSWORD_REQUIREMENTS"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationErrors: Record<string, string> = {};
      errors.array().forEach((err) => {
        if (err.type === "field") {
          validationErrors[err.path] = req.t(err.msg);
        }
      });

      return res.status(400).send({ validationErrors });
    }

    try {
      await saveUser(req.body as User);
      res.send({ message: "User registered" });
    } catch (error) {
      if(error instanceof EmailError) {
        res.status(502).send({ message: req.t(error.message) });
      }
    }
  }
);

export { router as userRouter };