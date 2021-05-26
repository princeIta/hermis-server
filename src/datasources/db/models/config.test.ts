import ClientConfig from './config';

const config = {
  defaultMessage: {
    content: 'content 1',
    template: 'template 1',
    subject: 'subject 1'
  },
  defaultSender: {
    name: 'sender 1',
    email: 'princeIta@outlook.com'
  }
};

it('should return instance of client config model', () => {
  const clientConfigModel = new ClientConfig(config);

  expect(clientConfigModel).toHaveProperty('_id');
  expect(clientConfigModel.defaultMessage.content).toBe(
    config.defaultMessage.content
  );
  expect(clientConfigModel.defaultMessage.template).toBe(
    config.defaultMessage.template
  );
  expect(clientConfigModel.defaultMessage.subject).toBe(
    config.defaultMessage.subject
  );
  expect(clientConfigModel.defaultSender.name).toBe(config.defaultSender.name);
  expect(clientConfigModel.defaultSender.email).toBe(
    config.defaultSender.email
  );
});
