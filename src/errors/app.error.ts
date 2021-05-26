import BaseError from './base.error';

export default class AppError extends BaseError {
  constructor({
    name = 'InternalServerError',
    message = 'internal server error',
    isOperational = true,
    statusCode = 500
  }) {
    super({ name, statusCode, message, isOperational });
  }
}
