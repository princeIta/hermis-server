import mongoose from '../connection';
import { IMessageLog, MessageType } from '../../../models/logged-message';
import { IClientDocument } from './client';

const MessageLogSchema: mongoose.Schema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  syntax: String,
  message: {
    type: {
      content: String,
      subject: String,
      messageType: { type: Number, enum: [MessageType.email, MessageType.sms] }
    },
    required: true
  },
  sentAt: { type: Date, required: true },
  recipient: {
    type: {
      name: String,
      phone: String,
      email: String
    },
    required: true
  }
});

export interface IMessageLogDocument extends IMessageLog, mongoose.Document {
  client: IClientDocument['_id'];
}

export interface IMessageLogDocumentPopulated extends IMessageLogDocument {
  client: IClientDocument;
}

export default mongoose.model<IMessageLogDocument>(
  'MessageLog',
  MessageLogSchema
);
