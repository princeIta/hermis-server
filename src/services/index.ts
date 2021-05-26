import cron from 'node-cron';

import AuthService from './auth.service';
import ClientService from './client.service';
import ScheduledMessageService from './scheduled-message.service';
import Database from '../datasources/db/models';
import MessagingService from './messaging.service';
import { ICronProvider } from '../datasources/gateway/jobs.gateway';
import { IMessagingProvider } from '../datasources/gateway/messaging.gateway';

export const authService = new AuthService();
export const clientService = new ClientService(Database);
export const scheduledMessageService = new ScheduledMessageService(
  Database,
  { email: {}, sms: {} },
  cron
);
export const messagingService = new MessagingService(Database, {
  email: {},
  sms: {}
});

export interface IServices {
  authService: AuthService;
  clientService: ClientService;
  scheduledMessageService: ScheduledMessageService<
    ICronProvider,
    IMessagingProvider
  >;
  messagingService: MessagingService<IMessagingProvider>;
}

export default {
  authService,
  clientService,
  scheduledMessageService,
  messagingService
};
