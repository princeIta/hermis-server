import { Model, Types } from 'mongoose';

import Client, { IClientDocument } from './client';
import Config, { IConfigDocument } from './config';
import ScheduledMessage, {
  IScheduledMessageDocument
} from './scheduled-message';
import MessageLog, { IMessageLogDocument } from './message-log';

export type ClientModel = Model<IClientDocument>;
export type ConfigModel = Model<IConfigDocument>;
export type ScheduledMessageModel = Model<IScheduledMessageDocument>;
export type MessageLogModel = Model<IMessageLogDocument>;
export type ObjectId = Types.ObjectId | Record<string, unknown> | string;

export interface IDatabase {
  Client: ClientModel;
  Config: ConfigModel;
  ScheduledMessage: ScheduledMessageModel;
  MessageLog: MessageLogModel;
}

export default <IDatabase>{
  Client,
  Config,
  ScheduledMessage,
  MessageLog
};
