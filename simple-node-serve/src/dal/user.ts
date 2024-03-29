import dbInstance from "./dabInstance";
import { DataTypes, Model } from "sequelize";

class User extends Model {
  public username!: string;
  public email!: string;
  public password!: string;
  public salt!: string;
  public active!: boolean;
  public activationToken!: string;
}

User.init(
  {
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    salt: { type: DataTypes.STRING },
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationToken: { type: DataTypes.STRING },
  },
  { sequelize: dbInstance, modelName: "User" }
);

export { User };
