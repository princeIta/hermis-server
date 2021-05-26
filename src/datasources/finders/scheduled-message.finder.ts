import ScheduledMessageGateway from '../gateway/scheduled-message.gateway';
import { IDatabase, ObjectId } from '../db/models';

export default class MessageFinder {
  private Database: IDatabase;

  constructor(Database: IDatabase) {
    this.Database = Database;
  }

  async findByClientId(
    clientId: ObjectId
  ): Promise<Array<ScheduledMessageGateway | void>> {
    const ScheduledMessageDB = this.Database.ScheduledMessage;

    const docs = await ScheduledMessageDB.find({
      client: clientId,
      isDeleted: false
    });

    if (docs && docs.length) {
      const listOfGateways = docs.map((doc) => {
        const scheduledMessageGateway = new ScheduledMessageGateway(
          this.Database
        );
        const scheduledMessagePojo = doc.toObject();

        scheduledMessageGateway.id = scheduledMessagePojo._id;
        scheduledMessageGateway.client = scheduledMessagePojo.client;
        scheduledMessageGateway.message = scheduledMessagePojo.message;
        scheduledMessageGateway.recipients = scheduledMessagePojo.recipients;
        scheduledMessageGateway.schedule = scheduledMessagePojo.schedule;
        scheduledMessageGateway.sender = scheduledMessagePojo.sender;

        return scheduledMessageGateway;
      });

      return listOfGateways;
    }
    return [];
  }

  async findById(id: ObjectId): Promise<ScheduledMessageGateway | void> {
    const ScheduledMessageDB = this.Database.ScheduledMessage;

    const doc = await ScheduledMessageDB.findById(id);

    if (doc) {
      const scheduledMessageGateway = new ScheduledMessageGateway(
        this.Database
      );
      const scheduledMessagePojo = doc.toObject();

      scheduledMessageGateway.id = scheduledMessagePojo._id;
      scheduledMessageGateway.client = scheduledMessagePojo.client;
      scheduledMessageGateway.message = scheduledMessagePojo.message;
      scheduledMessageGateway.recipients = scheduledMessagePojo.recipients;
      scheduledMessageGateway.schedule = scheduledMessagePojo.schedule;
      scheduledMessageGateway.sender = scheduledMessagePojo.sender;

      return scheduledMessageGateway;
    }
  }

  async findAll(): Promise<Array<ScheduledMessageGateway | void>> {
    const ScheduledMessageDB = this.Database.ScheduledMessage;
    const scheduledMessages = await ScheduledMessageDB.find({
      isDeleted: false
    });

    if (scheduledMessages) {
      const listOfGateways = scheduledMessages.map((scheduledMessage) => {
        const scheduledMessageGateway = new ScheduledMessageGateway(
          this.Database
        );
        const scheduledMessagePojo = scheduledMessage.toObject();

        scheduledMessageGateway.id = scheduledMessagePojo._id;
        scheduledMessageGateway.client = scheduledMessagePojo.client;
        scheduledMessageGateway.message = scheduledMessagePojo.message;
        scheduledMessageGateway.recipients = scheduledMessagePojo.recipients;
        scheduledMessageGateway.schedule = scheduledMessagePojo.schedule;
        scheduledMessageGateway.sender = scheduledMessagePojo.sender;
        scheduledMessageGateway.createdAt = scheduledMessagePojo.createdAt;

        return scheduledMessageGateway;
      });

      return listOfGateways;
    }

    return [];
  }
}
