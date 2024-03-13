import express from "express";
import { USER_ENDPOINT } from "../util/constants";
import { check, validationResult } from "express-validator";

const app = express();
app.use(express.json());

app.post(
  USER_ENDPOINT,
  check("username").notEmpty().withMessage("username is required"),
  check("email").notEmpty().withMessage("email is required"),
  check("password").notEmpty().withMessage("password is required"),
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

    res.send({ message: "User registered" });
  }
);

app.listen(3000, () => {
  console.log("Server ready on port 3000");
});

export default app;
