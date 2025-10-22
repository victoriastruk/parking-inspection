const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const {
  REFRESH_SERCRET,
  ACCESS_SECRET,
  REFRESH_EXPIRES_TIME,
  ACCESS_EXPIRES_TIME,
} = require("../config/constants");

const promisifyJWTSign = promisify(jwt.sign);
const promisifyJWTVerify = promisify(jwt.verify);

module.exports.createAccessToken = async ({
  userId,
  email,
  role,
  geolocation,
}) =>
  await promisifyJWTSign({ userId, email, role, geolocation }, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES_TIME,
  });

module.exports.verifyAccessToken = async (token) =>
  await promisifyJWTVerify(token, ACCESS_SECRET);

module.exports.createRefreshToken = async ({
  userId,
  email,
  role,
  geolocation,
}) =>
  await promisifyJWTSign(
    { userId, email, role, geolocation },
    REFRESH_SERCRET,
    {
      expiresIn: REFRESH_EXPIRES_TIME,
    }
  );
