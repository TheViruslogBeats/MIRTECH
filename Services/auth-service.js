const UserModel = require("../Models/User-Model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./token-service");
const UserDto = require("../Data/user-dto");
const ApiError = require("../exceptions/api-error");
const { logout } = require("../Controllers/auth-Controller");
const mailService = require("./mail-service");
const UserInfoModel = require("../Models/UserInfo-Model");
const UserInfoDto = require("../Data/userinfo-dto");

class AuthService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hash = await bcrypt.hash(password, 6);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      hash,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`
    );
    const userInfo = await UserInfoModel.create({
      firstName: "Имя",
      middleName: "Отчество",
      lastName: "Фамилия",
      userId: user.dataValues.id,
    });

    const userDto = new UserDto(user);
    const userInfoDto = new UserInfoDto(userInfo);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: { userDto, userInfoDto },
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ where: { activationLink } });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ where: { email: email } });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const userInfo = await UserInfoModel.findOne({
      where: { userId: user.dataValues.id },
    });
    const isPassEquals = await bcrypt.compare(password, user.hash);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const userInfoDto = new UserInfoDto(userInfo);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: { userDto, userInfoDto },
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnathorizedError();
    }
    const user = await UserModel.findOne({
      where: { id: tokenFromDb.dataValues.userId },
    });
    const userInfo = await UserInfoModel.findOne({
      where: { userId: user.dataValues.id },
    });
    const userDto = new UserDto(user);
    const userInfoDto = new UserInfoDto(userInfo);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: { userDto, userInfoDto },
    };
  }

  async getAllUsers() {
    const users = await UserModel.findAll({ raw: true });
    return users;
  }

  async getAllSensors() {}
}

module.exports = new AuthService();
