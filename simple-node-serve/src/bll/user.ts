import { User } from "../dal/user";
import { encrypt, generateSalt } from "../../util/encrypt";

async function saveUser(user: UserData) {
  // generate salt
  const salt = await generateSalt();
  // encrypt password
  const pass = await encrypt(user.password, salt);
  await User.create({...user, salt, password: pass });
}

async function emailExistsInBd(email: string) {
  const user = await User.findOne({ where: { email } });
  return !!user;
}

export { saveUser, emailExistsInBd };