import Client from './client';

const client = {
  name: 'client 1',
  contacts: [
    {
      name: 'contact 1',
      phone: '08123451746',
      email: 'princeIta@outlook.com'
    }
  ],
  serviceInfo: {
    startDate: new Date(),
    endDate: new Date(),
    isActive: true
  }
};

it('should return instance of client model', () => {
  const clientModel = new Client(client);

  expect(clientModel).toHaveProperty('_id');
  expect(clientModel.contacts[0].name).toBe(client.contacts[0].name);
  expect(clientModel.contacts[0].phone).toBe(client.contacts[0].phone);
  expect(clientModel.contacts[0].email).toBe(client.contacts[0].email);
  expect(clientModel.serviceInfo?.startDate).toBe(client.serviceInfo.startDate);
  expect(clientModel.serviceInfo?.endDate).toBe(client.serviceInfo.endDate);
  expect(clientModel.serviceInfo?.isActive).toBe(client.serviceInfo.isActive);
});
