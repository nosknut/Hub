import mongoose, { Document, Schema } from "mongoose";

export interface IExercise extends Document {
  username: string;
  description: string;
  duration: number;
  date: Date;
}

export const ExerciseSchema = mongoose.model<IExercise>("Exercise", new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true
}));
