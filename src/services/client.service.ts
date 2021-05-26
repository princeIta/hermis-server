import ClientFinder from '../datasources/finders/client.finder';
import ClientGateway from '../datasources/gateway/client.gateway';
import Result from '../lib/result';
import { IDatabase } from '../datasources/db/models';
import { IClient, IClientContact, IServiceInfo } from '../models/client';

interface IClientDto extends IClient {
  id?: string;
}

export default class ClientService {
  private Database: IDatabase;

  constructor(Database: IDatabase) {
    this.Database = Database;
  }

  async getAllClients() {
    const clientsFinder = new ClientFinder(this.Database);
    const listOfClientGateway = await clientsFinder.findAll();

    const clientsDto: Array<IClientDto | undefined> = [];
    for (let clientGateway of listOfClientGateway) {
      if (clientGateway) {
        clientsDto.push({
          id: clientGateway.id?.toString(),
          name: clientGateway.name,
          contacts: clientGateway.contacts,
          serviceInfo: clientGateway.serviceInfo
        });
      }
    }

    return Result.ok(clientsDto);
  }

  async createClient({
    name,
    contacts,
    serviceStartDate
  }: {
    name: string;
    contacts: Array<IClientContact>;
    serviceStartDate: Date;
  }) {
    const serviceInfo: IServiceInfo = {
      startDate: serviceStartDate
    };

    const clientGateway = new ClientGateway(this.Database);
    clientGateway.name = name;
    clientGateway.contacts = contacts;
    clientGateway.serviceInfo = serviceInfo;

    const clientDoc = await clientGateway.create();

    const clientDto: IClientDto = {
      id: clientDoc._id,
      serviceInfo: {
        startDate: clientDoc.serviceInfo?.startDate,
        isActive: clientDoc.serviceInfo?.isActive
      }
    };

    return Result.ok(clientDto);
  }
}
