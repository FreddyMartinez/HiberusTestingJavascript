import express from "express";
import { USER_ENDPOINT } from "../util/constants";

const app = express();
app.use(express.json());

app.post(USER_ENDPOINT, (req, res) => {
  const { username, email, password } = req.body;


  const validationErrors: Record<string, string> = {};
  if (!username) {
    validationErrors["username"] = "username is required";
  } 
  if (!email) {
    validationErrors["email"] = "email is required";
  } 
  if (!password) {
    validationErrors["password"] = "password is required";
  }
  if (Object.keys(validationErrors).length) {
    return res.status(400).send({validationErrors});
  }

  res.send({ message: "User registered"});
});

app.listen(3000, () => {
  console.log("Server ready on port 3000");
});

export default app;