const {
  Error: { ValidationError, CastError },
} = require("mongoose");

const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

module.exports = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).send(err.message);
  }

  if (err instanceof CastError) {
    return res.status(400).send(err.message);
  }

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    return res.status(403).send("Invalid access token");
  }

  const code = err.status || 500;

  return res.status(code).send({
    errors: [err],
  });
};
