import mongoose, { Document, Schema } from "mongoose";

export interface User {
  username: string;
}

export interface IUser extends Document, User { }

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
