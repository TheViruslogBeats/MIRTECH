const jwt = require("jsonwebtoken");
const TokenModel = require("../Models/Token-Model");

class TokenService {
  async generateTokens(payload) {
    const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30s",
    });
    const refreshToken = await jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateAccessToken(token) {
    try {
      const userData = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(token) {
    try {
      const userData = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({
      where: { userId },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      const token = await tokenData.update(
        { refreshToken: tokenData.refreshToken },
        { where: { userId: tokenData.userId } }
      );
      return token;
    }
    const token = await TokenModel.create({ userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await TokenModel.destroy({ where: { refreshToken } });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ where: { refreshToken } });

    return tokenData;
  }
}

module.exports = new TokenService();
