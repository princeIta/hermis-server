import { IDatabase, ObjectId } from '../datasources/db/models';
import { IClientDocument } from '../datasources/db/models/client';
import { IScheduledMessageDocument } from '../datasources/db/models/scheduled-message';
import { IClient } from '../models/client';
import { IScheduledMessage } from '../models/scheduled-message';
import { clients, scheduledMessages } from './data.mock';

const MockedClientModel = <any>{
  async create(client: IClient): Promise<IClientDocument> {
    if (!client.name) {
      throw new Error('name is required');
    }

    if (!client.contacts || !client.contacts.length) {
      throw new Error('contacts is required');
    }

    if (!client.serviceInfo || !client.serviceInfo.startDate) {
      throw new Error('service info is required');
    }

    const newClient = <IClientDocument>{ _id: '1', ...client };

    clients.push(newClient);
    return Promise.resolve(newClient);
  },

  async findByIdAndUpdate(
    id: any,
    updates: any,
    options: any
  ): Promise<IClientDocument | void> {
    let elemPos;
    const found: IClientDocument | undefined = clients.find(
      (each: IClientDocument, idx: number) => {
        elemPos = idx;
        return each._id == id;
      }
    );

    if (found && (elemPos || elemPos === 0)) {
      const updated: IClientDocument = Object.assign({}, found, updates);
      clients[elemPos] = updated;

      let ret: IClientDocument;
      if (options.new === true) {
        ret = updated;
      } else {
        ret = found;
      }

      ret.toObject = () => ({ ...ret });

      return Promise.resolve(ret);
    }
    return;
  },

  async findById(id: any): Promise<IClientDocument | void> {
    const found = clients.find((each) => each._id == id);

    if (found) {
      found.toObject = () => ({ ...found });
      return Promise.resolve(found);
    }
  },

  async find(): Promise<Array<IClientDocument> | Array<void>> {
    return Promise.resolve(
      clients.map((each) => <IClientDocument>{ ...each, toObject: () => each })
    );
  }
};

const MockedScheduledMessageModel = <any>{
  async create(message: IScheduledMessage): Promise<IScheduledMessageDocument> {
    if (!message.client) {
      throw new Error('client is required');
    }

    if (!message.message) {
      throw new Error('message is required');
    }

    if (!message.sender) {
      throw new Error('sender is required');
    }

    if (!message.schedule) {
      throw new Error('schedule is required');
    }

    if (!message.recipients || !message.recipients.length) {
      throw new Error('recipients is required');
    }

    const newMessage = <IScheduledMessageDocument>{ _id: '123', ...message };

    scheduledMessages.push(newMessage);
    return Promise.resolve(newMessage);
  },

  async findByIdAndUpdate(
    id: any,
    updates: any,
    options: any
  ): Promise<IScheduledMessageDocument | void> {
    let elemPos;
    const found: IScheduledMessageDocument | undefined = scheduledMessages.find(
      (each: IScheduledMessageDocument, idx: number) => {
        elemPos = idx;
        return each._id == id;
      }
    );

    if (found && (elemPos || elemPos === 0)) {
      const updated: IScheduledMessageDocument = Object.assign(
        {},
        found,
        updates
      );
      scheduledMessages[elemPos] = updated;

      let ret: IScheduledMessageDocument;
      if (options.new === true) {
        ret = updated;
      } else {
        ret = found;
      }

      ret.toObject = () => ({ ...ret });

      return Promise.resolve(ret);
    }
  },

  async findById(id: any): Promise<IScheduledMessageDocument | void> {
    const found = scheduledMessages.find((each) => each._id == id);

    if (found) {
      found.toObject = () => ({ ...found });

      return Promise.resolve(found);
    }
  },

  async find(): Promise<Array<IScheduledMessageDocument> | Array<void>> {
    return Promise.resolve(
      scheduledMessages.map(
        (each) =>
          <IScheduledMessageDocument>{ ...each, toObject: () => ({ ...each }) }
      )
    );
  }
};

export default <IDatabase>{
  Client: MockedClientModel,
  ScheduledMessage: MockedScheduledMessageModel
};
