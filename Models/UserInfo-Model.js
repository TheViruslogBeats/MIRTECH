const Sequelize = require("sequelize");
const dataBase = require("./ConnectDB");

const UserInfoModel = dataBase.define(
  "userinfo",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING,
      defaultValue: "http://128.68.56.25:5000/img/defaultprofileimage.png",
    },
    firstName: {
      type: Sequelize.STRING,
      defaultValue: "Имя",
    },
    middleName: {
      type: Sequelize.STRING,
      defaultValue: "Отчество",
    },
    lastName: {
      type: Sequelize.STRING,
      defaultValue: "Фамилия",
    },
  },
  { timestamps: false }
);

module.exports = UserInfoModel;
