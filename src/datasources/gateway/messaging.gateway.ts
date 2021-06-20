import {
  IScheduledRecipient,
  ScheduledMessage
} from '../../models/scheduled-message';
import { IMessage } from '../../models/logged-message';

export interface IMessagingProvider {
  email: any;
  sms: any;
}
// B8A2DB44233D995E5A84EB05449DC78A751841D67C1DB057D40E835A2D88FC05F8E8DF4102B14166ECC68682F867FB8F

function sendSms(message: IMessage | undefined, provider: any) { }

async function sendEmail<P extends IMessagingProvider>(
  message: IMessage | undefined,
  recipients: Array<IScheduledRecipient> | undefined,
  provider: P
) {
  const emailProvider = provider.email
  if (recipients?.length) {
    for await (let recipient of recipients) {
      let testAccount = await emailProvider.createTestAccount();

      let transporter = emailProvider.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass // generated ethereal password
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Hermis 👻" <princeIta@outlook.com>', // sender address
        to: recipient.email, // list of receivers
        subject: message?.subject, // Subject line
        text: message?.content, // plain text body
      });

      console.log('Message sent: %s', info.messageId);

      console.log('Preview URL: %s', emailProvider.getTestMessageUrl(info));
    }
  }
}

export default class MessagingGateway<P extends IMessagingProvider> {
  private messagingProvider: P;

  constructor(messagingProvider: P) {
    this.messagingProvider = messagingProvider;
  }

  async send(scheduledMessage: ScheduledMessage) {
    if (scheduledMessage.isMessageTypeEmail()) {
      return sendEmail(
        scheduledMessage.message,
        scheduledMessage.recipients,
        this.messagingProvider
      );
    } else {
      if (scheduledMessage.isMessageTypeSms()) {
        return sendSms(scheduledMessage.message, this.messagingProvider);
      }
    }
  }
}
