import Client, { IClient } from './client';
import { Document } from 'mongoose';
import { ObjectId } from '../datasources/db/models';
import {
  IScheduledMessageDocument,
  IScheduledMessageDocumentPopulated
} from '../datasources/db/models/scheduled-message';
import { IMessage, MessageType } from './logged-message';
import { IClientDocument } from '../datasources/db/models/client';

export interface IScheduledSender {
  name?: string;
  email?: string;
}

export interface IScheduledRecipient {
  name: string;
  phone?: string;
  email?: string;
}

export interface ISchedule {
  syntax?: string;
}

export interface IScheduledMessage {
  client?: IClient | ObjectId;
  message?: IMessage;
  schedule?: ISchedule;
  sender?: IScheduledSender;
  recipients?: Array<IScheduledRecipient>;
  isDeleted?: boolean;
  deletedAt?: Date;
  createdAt?: Date;
}

export class ScheduledMessage {
  private _id?: ObjectId;
  private _client?: IClient | ObjectId;
  private _message?: IMessage;
  private _schedule?: ISchedule;
  private _sender?: IScheduledSender;
  private _recipients?: Array<IScheduledRecipient>;
  private _isDeleted?: boolean;
  private _deletedAt?: Date;
  private _createdAt?: Date;

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get client() {
    return this._client;
  }
  set client(value) {
    this._client =
      value && value instanceof Document
        ? new Client(<IClientDocument>value)
        : value;
  }

  get message() {
    return this._message;
  }
  set message(value) {
    const message = {
      content: value?.content,
      messageType: value?.messageType,
      subject: value?.subject
    };

    this._message = message;
  }

  get schedule() {
    return this._schedule;
  }
  set schedule(value) {
    const schedule: ISchedule = {
      syntax: value?.syntax
    };

    this._schedule = schedule;
  }

  get sender() {
    return this._sender;
  }
  set sender(value) {
    this._sender = value;
  }

  get recipients() {
    return this._recipients;
  }
  set recipients(value) {
    this._recipients = value;
  }

  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(value) {
    this._isDeleted = value;
  }

  get deletedAt() {
    return this._deletedAt;
  }
  set deletedAt(value) {
    this.deletedAt = value;
  }

  get createdAt() {
    return this._createdAt;
  }
  set createdAt(value) {
    this.createdAt = value;
  }

  constructor(
    sm: IScheduledMessageDocument | IScheduledMessageDocumentPopulated
  ) {
    this.client = sm.client;
    this.message = sm.message;
    this.sender = sm.sender;
    this.schedule = sm.schedule;
    this.recipients = sm.recipients;

    if (sm.isDeleted && sm.deletedAt) {
      this.isDeleted = sm.isDeleted;
      this.deletedAt = sm.deletedAt;
    }

    if (sm.createdAt) {
      this.createdAt = sm.createdAt;
    }

    if (sm._id) {
      this.id = sm._id;
    }
  }

  isMessageTypeSms(): boolean {
    return this._message?.messageType === MessageType.sms;
  }

  isMessageTypeEmail(): boolean {
    return this._message?.messageType === MessageType.email;
  }
}
