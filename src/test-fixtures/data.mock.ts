import { IClientDocument } from '../datasources/db/models/client';
import { IScheduledMessageDocument } from '../datasources/db/models/scheduled-message';
import { MessageType } from '../models/logged-message';

export const clients = [
  <IClientDocument>{
    _id: '123',
    name: 'Org8',
    contacts: [
      {
        name: 'contact person org1',
        phone: '+2348123451746',
        email: 'hello@org1.com'
      }
    ],
    serviceInfo: {
      startDate: new Date(),
      isActive: true
    }
  }
];

export const scheduledMessages = [
  <IScheduledMessageDocument>{
    _id: 'abc',
    client: '123',
    message: {
      content: 'Hello! World!',
      subject: 'Say Hello',
      messageType: MessageType.email
    },
    schedule: {
      syntax: '[monthly][2][3]'
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
  }
];
