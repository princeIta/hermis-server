import ClientGateway from '../gateway/client.gateway';
import { IDatabase, ObjectId } from '../db/models';

export default class ClientFinder {
  private Database: IDatabase;
  constructor(Database: IDatabase) {
    this.Database = Database;
  }

  async findById(
    clientId: ObjectId | Record<string, unknown> | string
  ): Promise<ClientGateway | null> {
    const ClientDB = this.Database.Client;
    const client = await ClientDB.findById(clientId);

    if (client) {
      const clientGateway = new ClientGateway(this.Database);
      const clientObj = client.toObject();

      clientGateway.id = clientObj._id;
      clientGateway.contacts = clientObj.contacts;
      clientGateway.name = clientObj.name;
      clientGateway.serviceInfo = clientObj.serviceInfo;

      return clientGateway;
    }

    return null;
  }

  async findAll(): Promise<Array<ClientGateway | void>> {
    const ClientDB = this.Database.Client;
    const clients = await ClientDB.find();

    if (clients && clients.length) {
      const listOfGateways = clients.map((client) => {
        const clientGateway = new ClientGateway(this.Database);
        const clientObj = client.toObject();

        clientGateway.id = clientObj._id;
        clientGateway.contacts = clientObj.contacts;
        clientGateway.name = clientObj.name;
        clientGateway.serviceInfo = clientObj.serviceInfo;

        return clientGateway;
      });

      return listOfGateways;
    }

    return [];
  }
}
