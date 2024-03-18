import { Sequelize } from "sequelize";

const dbInstance = new Sequelize("dbTesting", "username", "bdPassword", {
  dialect: "sqlite",
  storage: "./dbDev.sqlite",
  logging: false,
});

export default dbInstance;
