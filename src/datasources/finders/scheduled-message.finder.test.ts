import ScheduledMessageFinder from './scheduled-message.finder';
import ScheduledMessageGateway from '../gateway/scheduled-message.gateway';
import MockedDatabase from '../../test-fixtures/db-models.mock';
import { IDatabase } from '../db/models';

const MockedScheduledMessageModel = MockedDatabase.ScheduledMessage;

const Database = <IDatabase>{
  ScheduledMessage: MockedScheduledMessageModel
};

describe('Find scheduled messages', () => {
  it('should return scheduled messages of client specified by client id', async () => {
    const scheduledMessageFinder = new ScheduledMessageFinder(Database);

    const clientId = '123';

    const listOfScheduledMessageGateway = await scheduledMessageFinder.findByClientId(
      clientId
    );

    expect(listOfScheduledMessageGateway.length).toBeGreaterThan(0);
    expect(listOfScheduledMessageGateway[0]).toBeInstanceOf(
      ScheduledMessageGateway
    );
  });
});
