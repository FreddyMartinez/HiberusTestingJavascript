import { User } from "../dal/user";
import { encrypt, generateSalt } from "../../util/encrypt";

async function saveUser(user: UserData) {
  // generate salt
  const salt = generateSalt();
  // encrypt password
  const pass = await encrypt(user.password, salt);
  await User.create({...user, password: pass });
}

export { saveUser };