const { isCelebrateError } = require('celebrate');
const BadRequest = require('../errors/badRequest');

const errorMiddlewares = (err, req, res, next) => {
  if (!isCelebrateError(err)) {
    return next(err);
  }
  throw new BadRequest(err);
};

module.exports = errorMiddlewares;
