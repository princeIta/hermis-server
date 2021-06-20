import cron from 'node-cron';
import nodemailer from "nodemailer"

import AuthService from './auth.service';
import ClientService from './client.service';
import ScheduleMessageService from './schedule-message.service';
import Database from '../datasources/db/models';
import MessagingService from './messaging.service';
import { ICronProvider } from '../datasources/gateway/jobs.gateway';
import { IMessagingProvider } from '../datasources/gateway/messaging.gateway';

export const authService = new AuthService();
export const clientService = new ClientService(Database);
export const scheduledMessageService = new ScheduleMessageService(
  Database,
  { email: nodemailer, sms: {} },
  cron
);
export const messagingService = new MessagingService(Database, {
  email: nodemailer,
  sms: {}
});

export interface IServices {
  authService: AuthService;
  clientService: ClientService;
  scheduledMessageService: ScheduleMessageService<
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
