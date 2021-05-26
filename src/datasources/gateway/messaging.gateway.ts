import { ScheduledMessage } from '../../models/scheduled-message';

export interface IMessagingProvider {
  email: any;
  sms: any;
}

function sendSms(message: any, provider: any) {}

function sendEmail(message: any, provider: any) {}

export default class MessagingGateway {
  private messagingProvider: IMessagingProvider;

  constructor(messagingProvider: IMessagingProvider) {
    this.messagingProvider = messagingProvider;
  }

  async send(message: ScheduledMessage) {
    if (message.isMessageTypeEmail()) {
      return sendEmail(message, this.messagingProvider);
    } else {
      if (message.isMessageTypeSms()) {
        return sendSms(message, this.messagingProvider);
      }
    }
  }
}
