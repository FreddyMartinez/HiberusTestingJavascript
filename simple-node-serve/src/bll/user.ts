import { User } from "../dal/user";
import { createToken, encrypt, generateSalt } from "../../util/encrypt";
import { sendEmail } from "../services/email";
import { EmailError } from "../../util/errors";
import dbInstance from "../dal/dabInstance";

async function saveUser(user: UserData) {
  const { username, email, password } = user;
  // generate salt
  const salt = await generateSalt();
  // encrypt password
  const pass = await encrypt(password, salt);
  const activationToken = createToken(16);
  const transaction = await dbInstance.transaction();
  await User.create({ username, email, salt, password: pass, activationToken }, { transaction });
  try {
    await sendEmail(email, activationToken);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new EmailError("USER_MESSAGES.ERROR_SENDING_EMAIL");
  }
}

async function emailExistsInBd(email: string) {
  const user = await User.findOne({ where: { email } });
  return !!user;
}

async function activateUser(token: string) {
  const user = await User.findOne({ where: { activationToken: token } });
  if(!user) {
    throw new Error("USER_MESSAGES.ACTIVATION_TOKEN_NOT_VALID");
  }

  user.active = true;
  user.activationToken = '';
  await user.save();
}

export { saveUser, emailExistsInBd, activateUser };
