import { Types } from 'mongoose';

export enum MessageType {
  email,
  sms
}

export interface IRecipient {
  name: string;
  phone?: string;
  email?: string;
}

export interface IMessage {
  content?: string;
  subject?: string;
  messageType?: MessageType;
}

export interface IMessageLog {
  client?: Types.ObjectId | Record<string, unknown>;
  message: IMessage;
  sentAt: Date;
  recipient: IRecipient;
  syntax: string;
}

export default class MessageLog {
  client?: Types.ObjectId | Record<string, unknown>;
  message: IMessage;
  sentAt: Date;
  recipient: IRecipient;
  syntax: string;

  constructor({ client, message, recipient, sentAt, syntax }: IMessageLog) {
    this.client = client;
    this.message = message;
    this.sentAt = sentAt;
    this.recipient = recipient;
    this.syntax = syntax;
  }
}
