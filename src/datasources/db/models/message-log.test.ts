import Message from './message-log';
import { IMessageLog, MessageType } from '../../../models/logged-message';

const message: IMessageLog = {
  message: {
    content: 'content 1',
    subject: 'subject 1',
    messageType: MessageType.email
  },
  syntax: '*****',
  sentAt: new Date(),
  recipient: {
    name: 'Recipient 1',
    phone: '08123451746',
    email: 'princeIta@outlook.com'
  }
};

it('should return instance of tracked message model', () => {
  const messageModel = new Message(message);

  expect(messageModel).toHaveProperty('_id');
  expect(messageModel.message.content).toBe(message.message.content);
  expect(messageModel.message.subject).toBe(message.message.subject);
  expect(messageModel.message.messageType).toBe(message.message.messageType);

  expect(messageModel.syntax).toBe(message.syntax);
  expect(messageModel.sentAt).toBe(message.sentAt);
  expect(messageModel.recipient.name).toBe(message.recipient.name);
  expect(messageModel.recipient.phone).toBe(message.recipient.phone);
  expect(messageModel.recipient.email).toBe(message.recipient.email);
});
