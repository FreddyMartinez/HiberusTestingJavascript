import { User } from "../dal/user";
import { encrypt, generateSalt } from "../../util/encrypt";
import { USER_MESSAGES } from "../../util/constants";

async function saveUser(user: UserData) {
  // generate salt
  const salt = await generateSalt();
  // encrypt password
  const pass = await encrypt(user.password, salt);
  try {
    await User.create({...user, salt, password: pass });
  } catch (error) {
    throw new BdConnectionError("Error saving user in database");
  }
}

async function emailExistsInBd(email: string) {
  const user = await User.findOne({ where: { email } });
  return !!user;
}

export class BdConnectionError extends Error {
  name = "BdConnectionError";
  constructor(message: string) {
    super(message);
  }
}

export { saveUser, emailExistsInBd };