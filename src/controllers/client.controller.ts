import {
  Response as IExpressResponse,
  Request as IExpressRequest,
  NextFunction as ExpressNextFunc
} from 'express';

import BaseController from './base.controller';
import { IServices } from '../services';
import { IClientContact } from '../models/client';
import AppError from '../errors/app.error';

export default class ClientController extends BaseController {
  private Services: IServices;

  constructor(Services: IServices) {
    super();
    this.Services = Services;
    this._bindAll(this);
  }

  async createClient(
    req: IExpressRequest,
    res: IExpressResponse,
    next: ExpressNextFunc
  ) {
    const {
      name,
      contacts,
      serviceStartDate = new Date()
    }: {
      name: string;
      contacts: Array<IClientContact>;
      serviceStartDate: Date;
    } = req.body;

    const clientService = this.Services.clientService;

    const newClient = await clientService.createClient({
      name,
      contacts,
      serviceStartDate
    });

    this.response(newClient, res);
  }

  async getAllClients(
    req: IExpressRequest,
    res: IExpressResponse,
    next: ExpressNextFunc
  ) {
    const clientService = this.Services.clientService;

    const clients = await clientService.getAllClients();

    this.response(clients, res);
  }

  async activateClient(
    req: IExpressRequest,
    res: IExpressResponse,
    next: ExpressNextFunc
  ) {
    throw new AppError({
      name: 'NotImplementedError',
      message: 'watchout for this function',
      statusCode: 404
    });
  }

  async deactivateClient(
    req: IExpressRequest,
    res: IExpressResponse,
    next: ExpressNextFunc
  ) {
    throw new AppError({
      name: 'NotImplementedError',
      message: 'watchout for this function',
      statusCode: 404
    });
  }
}
