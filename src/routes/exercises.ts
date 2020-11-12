import { Router } from "express";
import { Exercise, ExerciseSchema, IExercise } from "../models/exercise.model";
import { standardRoutes } from './standardRoutes';

export const ExercisesRouter = Router();

standardRoutes<Exercise, IExercise>(ExercisesRouter, 'Exercise', ExerciseSchema, (body) => ({
  username: body.username,
  description: body.description,
  duration: Number(body.duration),
  date: new Date(body.date),
}));
