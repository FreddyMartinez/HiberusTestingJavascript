import { User } from "../dal/user";
import { encrypt, generateSalt } from "../../util/encrypt";

async function saveUser(user: UserData) {
  // generate salt
  const salt = await generateSalt();
  // encrypt password
  const pass = await encrypt(user.password, salt);
  await User.create({...user, salt, password: pass });
}

export { saveUser };