import { Response as IExpressResponse } from 'express';

import BaseError from '../errors/base.error';
import Result from '../lib/result';

export default class BaseController {
  protected response(result: Result, res: IExpressResponse) {
    if (result.isFailure) {
      return this._error(<BaseError>result.error, res);
    }
    return this._response(result.getValue(), res);
  }

  private _response(obj: unknown, res: IExpressResponse) {
    return res.json(obj);
  }

  protected _bindAll(obj: any) {
    const objMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));

    for (let methodName of objMethods) {
      if (typeof obj[methodName] === 'function') {
        const isExemptedMethod =
          methodName === 'constructor' || methodName === 'bindAll' || false;

        if (!isExemptedMethod) {
          obj[methodName] = obj[methodName].bind(obj);
        }
      }
    }
  }

  private _error(err: BaseError, res: IExpressResponse) {
    return res.status(err.statusCode as number).json(err);
  }
}
