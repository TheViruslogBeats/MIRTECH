const Sequelize = require("sequelize");
const dataBase = require("./ConnectDB");
const TokenModel = require("./Token-Model");
const UserInfoModel = require("./UserInfo-Model");

const UserModel = dataBase.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  activationLink: {
    type: Sequelize.STRING,
  },
  isActivated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

UserModel.hasOne(TokenModel);
UserModel.hasOne(UserInfoModel)

module.exports = UserModel;
