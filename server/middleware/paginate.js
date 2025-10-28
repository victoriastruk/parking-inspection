const MAX_LIMIT = 5;

module.exports = (req, res, next) => {
  try {
    let { limit, offset } = req.query;

    limit = parseInt(limit, 10);
    offset = parseInt(offset, 10);

    req.pagination = {
      limit: !limit || limit <= 0 || limit > MAX_LIMIT ? MAX_LIMIT : limit,
      offset: !offset || offset < 0 ? 0 : offset,
    };

    next();
  } catch (error) {
    next(error);
  }
};
