import Message from './scheduled-message';
import { MessageType } from '../../../models/logged-message';

const message = {
  message: {
    content: 'Hello! World!',
    subject: 'Say Hello',
    messageType: MessageType.email
  },
  schedule: {
    syntax: '*****'
  },
  sender: {
    name: '525System',
    email: 'hello@525system.com'
  },
  recipients: [
    {
      name: 'contact person org1',
      email: 'org1@gmail.com'
    }
  ]
};

it('should return instance of scheduled message model', () => {
  const messageModel = new Message(message);

  expect(messageModel).toHaveProperty('_id');
  expect(messageModel.message?.content).toBe(message.message?.content);
  expect(messageModel.message?.subject).toBe(message.message?.subject);
  expect(messageModel.message?.messageType).toBe(message.message?.messageType);
  expect(messageModel.schedule?.syntax).toBe(message.schedule?.syntax);
  expect(messageModel.sender?.name).toBe(message.sender?.name);
  expect(messageModel.sender?.email).toBe(message.sender?.email);
  expect(messageModel.recipients[0].name).toBe(message.recipients[0].name);
  expect(messageModel.recipients[0].email).toBe(message.recipients[0].email);
});
