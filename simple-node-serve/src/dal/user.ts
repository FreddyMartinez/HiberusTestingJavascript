import dbInstance from "./dabInstance";
import { DataTypes } from "sequelize";

const User = dbInstance.define("User", {
  username: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

export { User };