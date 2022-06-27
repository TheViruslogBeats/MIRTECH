const Sequelize = require("sequelize");
const dataBase = require("./ConnectDB");

const TokenModel = dataBase.define(
  "token",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = TokenModel;
