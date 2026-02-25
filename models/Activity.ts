// models/Activity.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { connectMongoose } from '@/lib/mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  description: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['persona_created', 'analysis_completed', 'chat_session'],
    },
    description: {
      type: String,
      required: true,
    },
    metadata: Schema.Types.Mixed,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ActivityModel: Model<IActivity> =
  (mongoose.models.Activity as Model<IActivity>) || mongoose.model<IActivity>('Activity', ActivitySchema);

export async function getActivityModel(): Promise<Model<IActivity>> {
  await connectMongoose();
  return ActivityModel;
}

export default ActivityModel;