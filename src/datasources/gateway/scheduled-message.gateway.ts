import { IClient } from '../../models/client';
import { IMessage } from '../../models/logged-message';
import {
  ISchedule,
  IScheduledSender,
  IScheduledRecipient,
  IScheduledMessage
} from '../../models/scheduled-message';
import { IDatabase, ObjectId, ScheduledMessageModel } from '../db/models';
import { Document } from 'mongoose';
import { IClientDocument } from '../db/models/client';

export default class ScheduledMessageGateway {
  private ScheduledMessageDB: ScheduledMessageModel;
  private _id?: ObjectId;
  private _client?: IClientDocument | ObjectId | IClient;
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
      value instanceof Document
        ? {
            _id: value._id,
            contacts: value.contacts,
            name: value.name,
            serviceInfo: value.serviceInfo
          }
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

  constructor({ ScheduledMessage }: IDatabase) {
    this.ScheduledMessageDB = ScheduledMessage;
  }

  async create() {
    const message = {
      client: this._client,
      message: this._message,
      schedule: this._schedule,
      sender: this._sender,
      recipients: this._recipients
    };

    return (await this.ScheduledMessageDB.create(message)).toObject();
  }

  async update() {
    const updates: IScheduledMessage = {
      message: this._message,
      schedule: this._schedule,
      sender: this._sender,
      recipients: this._recipients,
      client: this._client instanceof Document ? this._client._id : this._client
    };

    if (this._isDeleted && this._deletedAt) {
      updates.isDeleted = this._isDeleted;
      updates.deletedAt = this._deletedAt;
    }

    const messagesId = this._id;

    return (
      await this.ScheduledMessageDB.findByIdAndUpdate(messagesId, updates, {
        new: true
      })
    )?.toObject();
  }
}
