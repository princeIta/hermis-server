import ClientGateway from '../gateway/client.gateway';
import ClientFinder from './client.finder';
import MockedDatabase from '../../test-fixtures/db-models.mock';
import { IDatabase } from '../db/models';

const MokedClientModel = MockedDatabase.Client;

const Database = <IDatabase>{
  Client: MokedClientModel
};

describe('find client by id', () => {
  it('should return client with the given id', async () => {
    const clientFinder = new ClientFinder(Database);

    const clientId = '123';
    const expectedName = 'Org8';

    const clientGateway = await clientFinder.findById(clientId);

    expect(clientGateway?.id).not.toBeNull();
    expect(clientGateway?.id).not.toBeUndefined();
    expect(clientGateway?.id).toBe(clientId);
    expect(clientGateway?.name).toBe(expectedName);
    expect(clientGateway?.contacts).not.toBeFalsy();
    expect(clientGateway?.serviceInfo).not.toBeFalsy();
  });

  it('should return null for non-existent client', async () => {
    const clientFinder = new ClientFinder(Database);

    const nonExistentId = '124';

    const clientGateway = await clientFinder.findById(nonExistentId);

    expect(clientGateway).toBeNull();
  });
});

describe('find all clients', () => {
  it('should return all clients', async () => {
    const clientFinder = new ClientFinder(Database);

    const listOfClientGateway = await clientFinder.findAll();

    expect(listOfClientGateway.length).toBeGreaterThan(0);
    expect(listOfClientGateway[0]).toBeInstanceOf(ClientGateway);
  });
});
