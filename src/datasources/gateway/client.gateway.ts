import { IDatabase, ClientModel, ObjectId } from '../db/models';
import { IClient, IClientContact, IServiceInfo } from '../../models/client';

export default class ClientGateway {
  private ClientDB: ClientModel;
  private _id?: ObjectId | Record<string, unknown> | string;
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

  constructor({ Client }: IDatabase) {
    this.ClientDB = Client;
  }

  async create() {
    const client = {
      name: this.name,
      contacts: this.contacts,
      serviceInfo: this.serviceInfo
    };

    return (await this.ClientDB.create(client)).toObject();
  }

  async update() {
    const updates: IClient = {
      name: this.name,
      contacts: this.contacts,
      serviceInfo: this.serviceInfo
    };

    if (this._isDeleted && this._deletedAt) {
      updates.isDeleted = this._isDeleted;
      updates.deletedAt = this._deletedAt;
    }

    const clientId = this.id;

    return (
      await this.ClientDB.findByIdAndUpdate(clientId, updates, {
        new: true
      })
    )?.toObject();
  }
}
