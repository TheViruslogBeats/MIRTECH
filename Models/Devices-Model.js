const Sequelize = require("sequelize");
const dataBase = require("./ConnectDB");

const DevicesModel = dataBase.define(
  "user_devices",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    deviceName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deviceProtocol: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = TokenModel;
