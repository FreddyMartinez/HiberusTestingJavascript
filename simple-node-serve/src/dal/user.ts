import dbInstance from "./dabInstance";
import { DataTypes, Model } from "sequelize";

class User extends Model {
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  },
  { sequelize: dbInstance, modelName: "User" }
);

export { User };