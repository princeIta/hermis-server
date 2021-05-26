import Result from '../lib/result';
import error from '../errors';
import MessagingGateway, {
  IMessagingProvider
} from '../datasources/gateway/messaging.gateway';
import { IMessage } from '../models/logged-message';
import { IRecipient } from '../models/logged-message';
import { IDatabase, ObjectId } from '../datasources/db/models';
import { IScheduledMessageDocument } from '../datasources/db/models/scheduled-message';
import {
  IScheduledSender,
  ScheduledMessage
} from '../models/scheduled-message';

export default class MessageService<M extends IMessagingProvider> {
  private Database: IDatabase;
  private MessagingProvider: M;

  constructor(Database: IDatabase, MessagingProvider: M) {
    this.Database = Database;
    this.MessagingProvider = MessagingProvider;
  }

  async sendMessage({
    message,
    recipient,
    clientId,
    sender
  }: {
    sender: IScheduledSender;
    message: IMessage;
    recipient: IRecipient;
    clientId: ObjectId;
  }) {
    const messagingGateway = new MessagingGateway(this.MessagingProvider);
    const scheduledMessage = new ScheduledMessage({
      client: clientId,
      recipients: [recipient],
      message,
      sender
    } as IScheduledMessageDocument);

    return Result.ok(
      messagingGateway
        .send(scheduledMessage)
        .then(() => ({ success: true }))
        .catch((err) => error(err))
    );
  }
}
