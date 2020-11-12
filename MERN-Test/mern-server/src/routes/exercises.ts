import {Router} from "express";
import {ExerciseSchema, IExercise} from "../models/exercise.model";

export const ExercisesRouter = Router();

ExercisesRouter.route("/").get((req, res) => {
  ExerciseSchema.find()
  .then((exercises) => res.json(exercises))
  .catch((err) => res.status(400).json("Error: " + err));
});

ExercisesRouter.route("/").post((req, res) => {
  new ExerciseSchema({
    username: req.body.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: new Date(req.body.date),
  }).save()
  .then(() => res.json("Exercise added!"))
  .catch((err) => res.status(400).json("Error: " + err));
});

ExercisesRouter.route("/:id").get((req, res) => {
  ExerciseSchema.findById(req.params.id)
  .then((exercise) => res.json(exercise))
  .catch((err) => res.status(400).json("Error: " + err));
});

ExercisesRouter.route("/:id").delete((req, res) => {
  ExerciseSchema.findByIdAndDelete(req.params.id)
  .then(() => res.json("Exercise deleted."))
  .catch((err) => res.status(400).json("Error: " + err));
});

ExercisesRouter.route("/:id").put((req, res) => {
  ExerciseSchema.findById(req.params.id)
  .then((exercise) => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = new Date(req.body.date);

    exercise.save()
    .then(() => res.json("Exercise updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
  })
  .catch((err) => res.status(400).json("Error: " + err));
});
