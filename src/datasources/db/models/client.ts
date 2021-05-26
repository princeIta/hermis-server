import mongoose from '../connection';
import { IClientContact, IClient } from '../../../models/client';

const ClientSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true },
  contacts: {
    type: [
      {
        name: String,
        phone: String,
        email: String
      }
    ],
    required: true
  },
  serviceInfo: {
    type: {
      startDate: { type: Date, default: Date.now, required: true },
      endDate: { type: Date },
      isActive: { type: Boolean, default: true }
    },
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
});

export interface IClientDocument extends mongoose.Document, IClient {
  contacts: mongoose.Types.Array<IClientContact>;
}

export default mongoose.model<IClientDocument>('Client', ClientSchema);
