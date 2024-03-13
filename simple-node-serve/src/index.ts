import express, { NextFunction, Request, Response } from "express";
import { USER_ENDPOINT } from "../util/constants";

const app = express();
app.use(express.json());

interface CustomRequest extends Request {
  validationErrors?: Record<string, string>;
}

const validateUser = (req: CustomRequest, _: Response, next: NextFunction) => {
  const { username } = req.body;

  if (!username) {
    req.validationErrors = {};
    req.validationErrors.username = "username is required";
  }

  next();
};

const validateEmail = (req: CustomRequest, _: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    req.validationErrors = {
      ...req.validationErrors,
      email: "email is required",
    };
  }

  next();
};

const validatePassword = (
  req: CustomRequest,
  _: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  if (!password) {
    req.validationErrors = {
      ...req.validationErrors,
      password: "password is required",
    };
  }

  next();
};

app.post(
  USER_ENDPOINT,
  validateUser,
  validateEmail,
  validatePassword,
  (req: CustomRequest, res) => {
    if (req.validationErrors) {
      return res.status(400).send({ validationErrors: req.validationErrors });
    }

    res.send({ message: "User registered" });
  }
);

app.listen(3000, () => {
  console.log("Server ready on port 3000");
});

export default app;
