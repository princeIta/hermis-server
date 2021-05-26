import { ObjectId } from 'mongoose';
import { IClientDocument } from '../datasources/db/models/client';

export interface IClient {
  name?: string;
  contacts?: Array<IClientContact>;
  serviceInfo?: IServiceInfo;
  isDeleted?: boolean;
  deletedAt?: Date;
}

export interface IClientContact {
  name: string;
  phone?: string;
  email?: string;
}

export interface IServiceInfo {
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
}

export default class Client {
  private _id?: ObjectId;
  private _name?: string;
  private _contacts?: Array<IClientContact>;
  private _serviceInfo?: IServiceInfo;
  private _isDeleted?: boolean;
  private _deletedAt?: Date;

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  get contacts() {
    return this._contacts;
  }
  set contacts(value) {
    this._contacts = value;
  }

  get serviceInfo() {
    return this._serviceInfo;
  }
  set serviceInfo(value) {
    this._serviceInfo = value;
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
    this._deletedAt = value;
  }

  constructor(client: IClientDocument) {
    this.name = client.name;
    this.contacts = client.contacts;
    this.serviceInfo = client.serviceInfo;
    if (client.isDeleted && client.deletedAt) {
      this.isDeleted = client.isDeleted;
      this.deletedAt = client.deletedAt;
    }
    if (client._id) {
      this.id = client._id;
    }
  }
}
