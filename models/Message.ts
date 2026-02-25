// models/Message.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { connectMongoose } from '@/lib/mongoose';

export interface IMessage extends Document {
  userId: string;
  personaId: string;
  personaName: string;
  role: string;
  content: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    personaId: {
      type: String,
      required: true,
      index: true,
    },
    personaName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MessageModel: Model<IMessage> =
  (mongoose.models.Message as Model<IMessage>) || mongoose.model<IMessage>('Message', MessageSchema);

export async function getMessageModel(): Promise<Model<IMessage>> {
  await connectMongoose();
  return MessageModel;
}

export default MessageModel;