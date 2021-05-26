import {
  Request as IExpressRequest,
  Response as IExpressResponse,
  NextFunction as ExpressNextFunction
} from 'express';

import AppError from '../errors/app.error';

export default function shield() {
  return function (
    request: IExpressRequest,
    response: IExpressResponse,
    next: ExpressNextFunction
  ) {
    const isLoggedIn = response.locals?.session;
    if (!isLoggedIn) {
      throw new AppError({
        name: 'BadRequestError',
        statusCode: 400,
        message: 'user not authenticated'
      });
    } else {
      return next();
    }
  };
}
