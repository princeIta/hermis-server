import {
  Request as IExpressRequest,
  Response as IExpressResponse,
  NextFunction as ExpressNextFunction
} from 'express';
import AppError from '../errors/app.error';

export default function wrongRouteError(
  request: IExpressRequest,
  response: IExpressResponse,
  next: ExpressNextFunction
) {
  const name = 'ResourceNotFoundError';
  const statusCode = 404;
  const message = `[${request.method ? request.method : ''}] ${
    request.path
  } is not a valid route`;

  const notFoundError = new AppError({ name, statusCode, message });

  return next(notFoundError);
}
