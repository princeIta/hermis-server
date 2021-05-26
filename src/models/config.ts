export interface IClientConfig {
  defaultMessage: IClientMessageConfig;
  defaultSender: ISender;
}

export interface IClientMessageConfig {
  content?: string;
  template?: string;
  subject: string;
}

export interface ISender {
  name: string;
  email: string;
}

export default class Config {
  defaultMessage: IClientMessageConfig;
  defaultSender: ISender;

  constructor({ defaultMessage, defaultSender }: IClientConfig) {
    this.defaultMessage = defaultMessage;
    this.defaultSender = defaultSender;
  }
}
