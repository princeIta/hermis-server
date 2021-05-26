import {
  Request as IExpressRequest,
  Response as IExpressResponse,
  NextFunction as ExpressNextFunction
} from 'express';

import error, { BaseError } from '../errors';

export default function errorMiddleware(
  err: BaseError,
  request: IExpressRequest,
  response: IExpressResponse,
  next: ExpressNextFunction
) {
  const errorObj = error(err);
  response.status(errorObj?.statusCode as number).json(errorObj);
}
