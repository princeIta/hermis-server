import ScheduledMessage from './scheduled-message.gateway';
import MockedDatabase from '../../test-fixtures/db-models.mock';
import { IScheduledMessage } from '../../models/scheduled-message';
import { MessageType } from '../../models/logged-message';
import { IDatabase } from '../db/models';

const MockedScheduledMessageModel = MockedDatabase.ScheduledMessage;

describe('Schedule a message', () => {
  const message: IScheduledMessage = {
    client: '123',
    message: {
      content: 'Scheduled Message 1',
      subject: 'SM 1 Subject',
      messageType: MessageType.email
    },
    schedule: {
      syntax: '[monthly][2][8]'
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

  it('should return a scheduled message object', async () => {
    const messageGateway = new ScheduledMessage(<IDatabase>{
      ScheduledMessage: MockedScheduledMessageModel
    });

    messageGateway.client = message.client;
    messageGateway.message = message.message;
    messageGateway.schedule = message.schedule;
    messageGateway.sender = message.sender;
    messageGateway.recipients = message.recipients;

    const savedMessage = await messageGateway.create();

    expect(savedMessage.client).toBe('123');
    expect(savedMessage.message).toEqual(message.message);
    expect(savedMessage.schedule).toEqual(message.schedule);
    expect(savedMessage.sender).toEqual(message.sender);
    expect(savedMessage.recipients).toEqual(message.recipients);
  });

  it('should throw an error as recipients is not set', () => {
    const messageGateway = new ScheduledMessage(<IDatabase>{
      ScheduledMessage: MockedScheduledMessageModel
    });

    messageGateway.client = message.client;
    messageGateway.message = message.message;
    messageGateway.schedule = message.schedule;
    messageGateway.sender = message.sender;

    return expect(messageGateway.create()).rejects.toThrow();
  });

  it('should throw an error as client is not set', () => {
    const messageGateway = new ScheduledMessage(<IDatabase>{
      ScheduledMessage: MockedScheduledMessageModel
    });

    messageGateway.message = message.message;
    messageGateway.schedule = message.schedule;
    messageGateway.sender = message.sender;
    messageGateway.recipients = message.recipients;

    return expect(messageGateway.create()).rejects.toThrow();
  });

  it('should throw an error as sender is not set', () => {
    const messageGateway = new ScheduledMessage(<IDatabase>{
      ScheduledMessage: MockedScheduledMessageModel
    });

    messageGateway.client = message.client;
    messageGateway.message = message.message;
    messageGateway.schedule = message.schedule;
    messageGateway.recipients = message.recipients;

    return expect(messageGateway.create()).rejects.toThrow();
  });

  it('should throw an error as message is not set', () => {
    const messageGateway = new ScheduledMessage(<IDatabase>{
      ScheduledMessage: MockedScheduledMessageModel
    });

    messageGateway.client = message.client;
    messageGateway.schedule = message.schedule;
    messageGateway.sender = message.sender;
    messageGateway.recipients = message.recipients;

    return expect(messageGateway.create()).rejects.toThrow();
  });

  it('should throw an error as schedule is not set', () => {
    const messageGateway = new ScheduledMessage(<IDatabase>{
      ScheduledMessage: MockedScheduledMessageModel
    });

    messageGateway.client = message.client;
    messageGateway.message = message.message;
    messageGateway.sender = message.sender;
    messageGateway.recipients = message.recipients;

    return expect(messageGateway.create()).rejects.toThrow();
  });
});

describe('updates to scheduled message', () => {
  const message: IScheduledMessage = {
    client: '123',
    message: {
      content: 'content update',
      subject: 'SM 1 Subject',
      messageType: MessageType.sms
    },
    schedule: {
      syntax: '[weekly][9][0]'
    },
    sender: {
      name: 'Ipx Ng',
      email: 'hello@ipxng.com'
    },
    recipients: [
      {
        name: 'contact person org update',
        phone: '+2348123451746'
      }
    ]
  };

  const messageId = 'abc';

  it('should update fields of the scheduled message document', async () => {
    const messageGateway = new ScheduledMessage(<IDatabase>{
      ScheduledMessage: MockedScheduledMessageModel
    });

    messageGateway.client = message.client;
    messageGateway.message = message.message;
    messageGateway.recipients = message.recipients;
    messageGateway.sender = message.sender;
    messageGateway.schedule = message.schedule;
    messageGateway.id = messageId;

    const doc = await messageGateway.update();

    expect(doc?.message).toEqual(message.message);
    expect(doc?.client).toEqual(message.client);
    expect(doc?.recipients).toEqual(message.recipients);
    expect(doc?.schedule).toEqual(message.schedule);
    expect(doc?.sender).toEqual(message.sender);
  });

  it('should return falsy for update with non-existent id', async () => {
    const messageGateway = new ScheduledMessage(<IDatabase>{
      ScheduledMessage: MockedScheduledMessageModel
    });

    messageGateway.client = message.client;
    messageGateway.message = message.message;
    messageGateway.recipients = message.recipients;
    messageGateway.sender = message.sender;
    messageGateway.schedule = message.schedule;
    messageGateway.id = 'does-not-exist';

    const doc = await messageGateway.update();

    expect(doc).toBeFalsy();
  });
});
