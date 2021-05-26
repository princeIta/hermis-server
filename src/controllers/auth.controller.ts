import {
  Response as IExpressResponse,
  Request as IExpressRequest,
  NextFunction as ExpressNextFunc
} from 'express';

import BaseController from './base.controller';
import { IServices } from '../services';

export default class AuthController extends BaseController {
  private Services: IServices;

  constructor(Services: IServices) {
    super();
    this.Services = Services;
    this._bindAll(this);
  }

  login(req: IExpressRequest, res: IExpressResponse, next: ExpressNextFunc) {
    const { passcode }: { passcode: string } = req.body;
    const authService = this.Services.authService;

    this.response(authService.login(passcode), res);
  }
}
