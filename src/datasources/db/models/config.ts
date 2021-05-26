import mongoose from '../connection';
import { IClientConfig } from '../../../models/config';

const ConfigSchema: mongoose.Schema = new mongoose.Schema({
  defaultMessage: {
    content: String,
    template: String,
    subject: String
  },
  defaultSender: {
    name: String,
    email: String
  }
});

export interface IConfigDocument extends IClientConfig, mongoose.Document {}

export default mongoose.model<IConfigDocument>('Config', ConfigSchema);
