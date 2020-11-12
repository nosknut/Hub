import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { ExercisesRouter } from "./routes/exercises";
import { UsersRouter } from "./routes/users";

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
// tslint:disable-next-line:no-console
console.log(uri);
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const { connection } = mongoose;
connection.once("open", () => {
  // tslint:disable-next-line:no-console
  console.log("MongoDB database connection established successfully");
});

app.use("/exercises", ExercisesRouter);
app.use("/users", UsersRouter);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on port ${port}`);
});
