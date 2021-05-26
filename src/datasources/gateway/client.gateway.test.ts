import Client from './client.gateway';
import MockedDatabase from '../../test-fixtures/db-models.mock';
import { IClient } from '../../models/client';
import { IDatabase } from '../db/models';

const MockedClientModel = MockedDatabase.Client;

describe('Client document creation', () => {
  it('should create a new client if all fields are set', () => {
    const newClient: IClient = {
      name: 'Org1',
      contacts: [
        {
          name: 'contact person org1',
          phone: '+2348123451746',
          email: 'hello@org1.com'
        }
      ],
      serviceInfo: {
        startDate: new Date(),
        isActive: true
      }
    };

    const clientGateway = new Client(<IDatabase>{ Client: MockedClientModel });

    clientGateway.name = newClient.name;
    clientGateway.contacts = newClient.contacts;
    clientGateway.serviceInfo = newClient.serviceInfo;

    return expect(clientGateway.create()).resolves.toEqual(
      expect.objectContaining({
        _id: '1',
        name: newClient.name,
        contacts: newClient.contacts,
        serviceInfo: newClient.serviceInfo
      })
    );
  });

  it('should throw an error as contacts is not set', () => {
    const clientWithoutContact: IClient = {
      name: 'Org1',
      serviceInfo: {
        startDate: new Date(),
        isActive: true
      }
    };

    const clientGateway = new Client(<IDatabase>{ Client: MockedClientModel });

    clientGateway.name = clientWithoutContact.name;
    clientGateway.serviceInfo = clientWithoutContact.serviceInfo;

    return expect(clientGateway.create()).rejects.toThrow();
  });

  it('should throw an error as name is not set', () => {
    const clientWithoutName: IClient = {
      contacts: [
        {
          name: 'contact person org1',
          phone: '+2348123451746',
          email: 'hello@org1.com'
        }
      ],
      serviceInfo: {
        startDate: new Date(),
        isActive: true
      }
    };

    const clientGateway = new Client(<IDatabase>{ Client: MockedClientModel });

    clientGateway.contacts = clientWithoutName.contacts;
    clientGateway.serviceInfo = clientWithoutName.serviceInfo;

    return expect(clientGateway.create()).rejects.toThrow();
  });

  it('should throw an error as service info is not set', () => {
    const clientWithoutServiceInfo: IClient = {
      name: 'Org1',
      contacts: [
        {
          name: 'contact person org1',
          phone: '+2348123451746',
          email: 'hello@org1.com'
        }
      ]
    };

    const clientGateway = new Client(<IDatabase>{ Client: MockedClientModel });

    clientGateway.name = clientWithoutServiceInfo.name;
    clientGateway.contacts = clientWithoutServiceInfo.contacts;

    return expect(clientGateway.create()).rejects.toThrow();
  });
});

describe('client document update', () => {
  const updates: IClient = {
    name: 'Org2-update'
  };

  it(`should update name to ${updates.name}`, () => {
    const clientGateway = new Client(<IDatabase>{ Client: MockedClientModel });

    clientGateway.id = '123';
    clientGateway.name = updates.name;

    return expect(clientGateway.update()).resolves.toHaveProperty(
      'name',
      updates.name
    );
  });
});
