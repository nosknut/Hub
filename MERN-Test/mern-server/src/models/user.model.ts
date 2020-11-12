import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
}

export const UserSchema = mongoose.model<IUser>("User", new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
  }
}, {
  timestamps: true
}));
