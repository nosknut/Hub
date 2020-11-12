import { Router } from "express";
import { IUser, User, UserSchema } from "../models/user.model";
import { standardRoutes } from "./standardRoutes";

export const UsersRouter = Router();
standardRoutes<User, IUser>(UsersRouter, 'User', UserSchema, (body) => ({
  username: body.username
}));

