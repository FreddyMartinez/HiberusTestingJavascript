import express from "express";
import { USER_ENDPOINT } from "../util/constants";

const app = express();
app.use(express.json());

app.post(USER_ENDPOINT, (req, res) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password) {
    return res.status(400).send('')
  }

  res.send({ message: "User registered"});
});

app.listen(3000, () => {
  console.log("Server ready on port 3000");
});

export default app;