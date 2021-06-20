import ScheduledMessageFinder from '../datasources/finders/scheduled-message.finder';
import ScheduledMessageGateway from '../datasources/gateway/scheduled-message.gateway';
import Result from '../lib/result';
import jobsGateway, { IJob } from '../datasources/gateway/jobs.gateway';
import MessagingGateway, {
  IMessagingProvider
} from '../datasources/gateway/messaging.gateway';
import { IDatabase } from '../datasources/db/models';
import {
  IScheduledMessage,
  ScheduledMessage
} from '../models/scheduled-message';
import { ICronProvider } from '../datasources/gateway/jobs.gateway';
import { IScheduledMessageDocument } from '../datasources/db/models/scheduled-message';

interface IScheduledMessageDto extends IScheduledMessage {
  id?: string;
  createdAt?: Date;
}

export default class ScheduleMessageService<
  C extends ICronProvider,
  M extends IMessagingProvider
> {
  private Database: IDatabase;
  private MessagingProvider: M;
  private CronProvider: C;

  constructor(Database: IDatabase, MessagingProvider: M, CronProvider: C) {
    this.Database = Database;
    this.MessagingProvider = MessagingProvider;
    this.CronProvider = CronProvider;
  }

  async getScheduledMessagesByClientId(clientId: string) {
    const scheduledMessageFinder = new ScheduledMessageFinder(this.Database);
    const lisOfSMessageGateway = await scheduledMessageFinder.findByClientId(
      clientId
    );

    const scheduledMessagesDto: Array<IScheduledMessageDto | undefined> = [];
    for (let sMessageGateway of lisOfSMessageGateway) {
      if (sMessageGateway) {
        scheduledMessagesDto.push({
          id: sMessageGateway.id?.toString(),
          message: sMessageGateway.message,
          client: sMessageGateway.client,
          recipients: sMessageGateway.recipients,
          sender: sMessageGateway.sender,
          schedule: sMessageGateway.schedule
        });
      }
    }

    return Result.ok(scheduledMessagesDto);
  }

  async deleteScheduledMessage(messageId: string) {
    const scheduledMessageFinder = new ScheduledMessageFinder(this.Database);
    const sMessageGateway = await scheduledMessageFinder.findById(messageId);

    let scheduledMessageDto: IScheduledMessageDto | undefined;

    if (sMessageGateway) {
      sMessageGateway.isDeleted = true;
      sMessageGateway.deletedAt = new Date();
      await sMessageGateway.update();

      const jobId = sMessageGateway.id?.toString();
      jobsGateway.jobProvider = this.CronProvider;
      jobsGateway.remove(jobId as string);

      scheduledMessageDto = {
        id: sMessageGateway.id?.toString(),
        isDeleted: sMessageGateway.isDeleted,
        deletedAt: sMessageGateway.deletedAt
      };
    }

    return Result.ok(scheduledMessageDto);
  }

  async schdeduleMessage(newScheduledMessage: IScheduledMessage) {
    const scheduledMessageGateway = new ScheduledMessageGateway(this.Database);
    scheduledMessageGateway.client = newScheduledMessage.client;
    scheduledMessageGateway.message = newScheduledMessage.message;
    scheduledMessageGateway.recipients = newScheduledMessage.recipients;
    scheduledMessageGateway.schedule = newScheduledMessage.schedule;
    scheduledMessageGateway.sender = newScheduledMessage.sender;

    const scheduledMessageDoc = await scheduledMessageGateway.create();
    const scheduledMessageEnt = new ScheduledMessage(
      <IScheduledMessageDocument>scheduledMessageDoc
    );

    const cronJob: IJob = {
      jobId: scheduledMessageDoc._id.toString(),
      scheduledAt: new Date(),
      cronSyntax: '' + scheduledMessageDoc.schedule?.syntax,
      task: () => {
        new MessagingGateway(this.MessagingProvider).send(scheduledMessageEnt);
      }
    };
    jobsGateway.jobProvider = this.CronProvider;
    jobsGateway.add(cronJob);

    return Result.ok({
      id: scheduledMessageDoc._id,
      createdAt: scheduledMessageDoc.createdAt
    });
  }

  async scheduleAllMessagesFromDB() {
    const scheduledMessageFinder = new ScheduledMessageFinder(this.Database);
    const listOfSMessageGateway = await scheduledMessageFinder.findAll();

    const scheduledMessagesDto: Array<IScheduledMessageDto | undefined> = [];
    for (let sMessageGateway of listOfSMessageGateway) {
      if (sMessageGateway) {
        const sMessage = {
          _id: sMessageGateway.id,
          client: sMessageGateway.client,
          message: sMessageGateway.message,
          recipients: sMessageGateway.recipients,
          schedule: sMessageGateway.schedule,
          sender: sMessageGateway.sender
        };

        const scheduledMessageEnt = new ScheduledMessage(
          <IScheduledMessageDocument>sMessage
        );

        const cronJob: IJob = {
          jobId: sMessageGateway.id?.toString() as string,
          scheduledAt: new Date(),
          cronSyntax: '' + sMessageGateway.schedule?.syntax,
          task: () => {
            new MessagingGateway(this.MessagingProvider).send(
              scheduledMessageEnt
            );
          }
        };

        jobsGateway.jobProvider = this.CronProvider;
        jobsGateway.add(cronJob);

        scheduledMessagesDto.push({
          id: sMessageGateway.id?.toString(),
          createdAt: sMessageGateway.createdAt
        });
      }
    }

    return Result.ok(scheduledMessagesDto);
  }
}
