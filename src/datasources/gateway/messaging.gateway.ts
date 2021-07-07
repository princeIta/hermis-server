import nodemailer from "nodemailer"

import {
  IScheduledRecipient,
  ScheduledMessage
} from '../../models/scheduled-message';
import { IMessage } from '../../models/logged-message';

export interface IMessagingProvider {
  email: IMessaging;
}

export interface IMessaging {
  send: (message: IMessage | undefined, recipients: Array<IScheduledRecipient> | undefined) => Promise<void>
}

export class Mail implements IMessaging {
  testAccount: nodemailer.TestAccount | undefined
  transporter: nodemailer.Transporter | undefined

  constructor() {
    (async () => {
      const testAccount = await nodemailer.createTestAccount()
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass // generated ethereal password
        }
      });

      this.testAccount = testAccount
    })()
  }

  async send(message: IMessage | undefined, recipients: Array<IScheduledRecipient> | undefined) {
    if (recipients?.length) {
      for (let recipient of recipients) {
        // send mail with defined transport object
        let info = await this.transporter?.sendMail({
          from: '"Hermis 👻" <princeIta@outlook.com>', // sender address
          to: recipient.email, // list of receivers
          subject: message?.subject, // Subject line
          text: message?.content, // plain text body
        });

        console.log('Message sent: %s', info.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
    }
  }
}

// B8A2DB44233D995E5A84EB05449DC78A751841D67C1DB057D40E835A2D88FC05F8E8DF4102B14166ECC68682F867FB8F

export default class MessagingGateway<P extends IMessagingProvider> {
  private messagingProvider: P;

  constructor(messagingProvider: P) {
    this.messagingProvider = messagingProvider;
  }

  async send(scheduledMessage: ScheduledMessage) {
    if (scheduledMessage.isMessageTypeEmail()) {
      return this.messagingProvider.email.send(
        scheduledMessage.message,
        scheduledMessage.recipients
      );
    }
  }
}
