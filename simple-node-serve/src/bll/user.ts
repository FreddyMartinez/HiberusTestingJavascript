import { User } from "../dal/user";
import { createToken, encrypt, generateSalt } from "../../util/encrypt";

async function saveUser(user: UserData) {
  const { username, email, password } = user;
  // generate salt
  const salt = await generateSalt();
  // encrypt password
  const pass = await encrypt(password, salt);
  const activationToken = createToken(16);
  await User.create({ username, email, salt, password: pass, activationToken });
}

async function emailExistsInBd(email: string) {
  const user = await User.findOne({ where: { email } });
  return !!user;
}

export { saveUser, emailExistsInBd };