import {
  Response as IExpressResponse,
  Request as IExpressRequest,
  NextFunction as ExpressNextFunc
} from 'express';

import BaseController from './base.controller';
import { IServices } from '../services';
import { ObjectId } from '../datasources/db/models';
import { IScheduledMessage } from '../models/scheduled-message';

export default class ScheduledMessageController extends BaseController {
  private Services: IServices;

  constructor(Services: IServices) {
    super();
    this.Services = Services;
    this._bindAll(this);
  }

  async getMessagesScheduledForClient(
    req: IExpressRequest,
    res: IExpressResponse,
    next: ExpressNextFunc
  ) {
    let clientId: ObjectId;
    ({ clientId } = req.params);

    const scheduledMessageService = this.Services.scheduledMessageService;

    const scheduledMessages = await scheduledMessageService.getScheduledMessagesByClientId(
      clientId
    );

    this.response(scheduledMessages, res);
  }

  async scheduleMessage(
    req: IExpressRequest,
    res: IExpressResponse,
    next: ExpressNextFunc
  ) {
    let clientId: ObjectId;
    ({ clientId } = req.params);

    const { message, cronSyntax, sender, recipients } = req.body;

    const scheduledMessageDto: IScheduledMessage = {
      message,
      sender,
      recipients,
      client: clientId,
      schedule: {
        syntax: cronSyntax
      }
    };

    const scheduledMessageService = this.Services.scheduledMessageService;

    const scheduledMessage = await scheduledMessageService.schdeduleMessage(
      scheduledMessageDto
    );

    this.response(scheduledMessage, res);
  }

  async sendInstantMessageToClient(
    req: IExpressRequest,
    res: IExpressResponse,
    next: ExpressNextFunc
  ) {
    const { clientId } = req.params;
    const { message, recipient, sender } = req.body;

    const messagingService = this.Services.messagingService;

    this.response(
      await messagingService.sendMessage({
        message,
        recipient,
        clientId,
        sender
      }),
      res
    );
  }

  async deleteScheduledMessage(
    req: IExpressRequest,
    res: IExpressResponse,
    next: ExpressNextFunc
  ) {
    const { messageId } = req.params;

    const scheduledMessageService = this.Services.scheduledMessageService;

    this.response(
      await scheduledMessageService.deleteScheduledMessage(messageId),
      res
    );
  }
}
