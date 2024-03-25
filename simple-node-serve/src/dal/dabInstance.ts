import { Sequelize } from "sequelize";

const dbInstance = new Sequelize("dbTesting", "username", "bdPassword", {
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

export default dbInstance;
