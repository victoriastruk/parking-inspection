const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const {
  REFRESH_SECRET,
  ACCESS_SECRET,
  REFRESH_EXPIRES_TIME,
  ACCESS_EXPIRES_TIME,
} = require("../config/constants");

const promosifyJWTSing = promisify(jwt.sign);
const promosifyJWTVerify = promisify(jwt.verify);

module.exports.createAccessToken = async ({
  userId,
  email,
  role,
  geolocation,
}) =>
  await promosifyJWTSing({ userId, email, role, geolocation }, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES_TIME,
  });

module.exports.verifyAccessToken = async (token) =>
  await promosifyJWTVerify(token, ACCESS_SECRET);

module.exports.createRefreshToken = async ({
  userId,
  email,
  role,
  geolocation,
}) =>
  await promosifyJWTSing({ userId, email, role, geolocation }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_TIME,
  });

module.exports.verifyRefreshToken = async (token) =>
  await promosifyJWTVerify(token, REFRESH_SECRET);
