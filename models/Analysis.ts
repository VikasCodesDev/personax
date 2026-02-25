// models/Analysis.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { connectMongoose } from '@/lib/mongoose';

export interface IAnalysis extends Document {
  userId: string;
  name: string;
  description: string;
  sampleText?: string;
  traits?: any;
  strengths?: string[];
  weaknesses?: string[];
  communicationStyle?: string;
  recommendations?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AnalysisSchema = new Schema<IAnalysis>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sampleText: String,
    traits: Schema.Types.Mixed,
    strengths: [String],
    weaknesses: [String],
    communicationStyle: String,
    recommendations: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AnalysisModel: Model<IAnalysis> =
  (mongoose.models.Analysis as Model<IAnalysis>) || mongoose.model<IAnalysis>('Analysis', AnalysisSchema);

export async function getAnalysisModel(): Promise<Model<IAnalysis>> {
  await connectMongoose();
  return AnalysisModel;
}

export default AnalysisModel;