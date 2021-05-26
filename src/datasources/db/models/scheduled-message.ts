import mongoose from '../connection';
import {
  IScheduledRecipient,
  IScheduledMessage
} from '../../../models/scheduled-message';
import { MessageType } from '../../../models/logged-message';
import { IClientDocument } from './client';

const ScheduledMessageSchema: mongoose.Schema = new mongoose.Schema({
  client: { type: mongoose.Types.ObjectId, ref: 'Client' },
  message: {
    type: new mongoose.Schema({
      content: String,
      subject: String,
      messageType: { type: Number, enum: [MessageType.email, MessageType.sms] }
    }),
    required: true
  },
  schedule: {
    type: new mongoose.Schema({
      syntax: String
    }),
    required: true
  },
  sender: {
    type: new mongoose.Schema({
      name: String,
      email: String
    }),
    required: true
  },
  recipients: {
    type: [
      new mongoose.Schema({
        name: String,
        phone: String,
        email: String
      })
    ],
    required: true
  },
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

export interface IScheduledMessageDocument
  extends mongoose.Document,
    IScheduledMessage {
  client: IClientDocument['_id'];
  recipients: mongoose.Types.Array<IScheduledRecipient>;
}

export interface IScheduledMessageDocumentPopulated
  extends mongoose.Document,
    IScheduledMessage {
  client: IClientDocument;
}

export default mongoose.model<IScheduledMessageDocument>(
  'ScheduledMessage',
  ScheduledMessageSchema
);
