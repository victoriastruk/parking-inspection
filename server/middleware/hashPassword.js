const CONSTANTS = require("../config/constants");
const bcrypt = require("bcrypt");

module.exports.hashPass = async (req, res, next) => {
  try {
    const { body } = req;
    const password = body && body.password;

    if (!password) {
      return res.status(400).send("Password is required");
    }
    req.passwordHash = await bcrypt.hash(password, CONSTANTS.SALT_ROUND);

    delete body.password;

    next();
  } catch (error) {
    next(error);
  }
};
