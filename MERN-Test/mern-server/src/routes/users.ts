import {Router} from "express";
import {IUser, UserSchema} from "../models/user.model";

export const UsersRouter = Router();

UsersRouter.route("/").get((req, res) => {
  UserSchema.find()
  .then((users) => res.json(users))
  .catch((err) => res.status(400).json("Error: " + err));
});

UsersRouter.route("/").post((req, res) => {
  new UserSchema({
    username: req.body.username,
  }).save()
  .then(() => res.json("User added!"))
  .catch((err) => res.status(400).json("Error: " + err));
});

UsersRouter.route("/:id").get((req, res) => {
  UserSchema.findById(req.params.id)
  .then((user) => res.json(user))
  .catch((err) => res.status(400).json("Error: " + err));
});

UsersRouter.route("/:id").delete((req, res) => {
  UserSchema.findByIdAndDelete(req.params.id)
  .then(() => res.json("User deleted."))
  .catch((err) => res.status(400).json("Error: " + err));
});

UsersRouter.route("/:id").put((req, res) => {
  UserSchema.findById(req.params.id)
  .then((user: IUser) => {
    user.username = req.body.username;

    user.save()
    .then(() => res.json("User updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
  })
  .catch((err) => res.status(400).json("Error: " + err));
});
