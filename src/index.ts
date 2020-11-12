import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { ExercisesRouter } from "./routes/exercises";
import { UsersRouter } from "./routes/users";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
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

app.use("/api/exercises", ExercisesRouter);
app.use("/api/users", UsersRouter);

app.get('/', (req, res) => {
  res.redirect('/client');
});
app.use("/client", express.static("client/build"));
app.use("/client/*", express.static("client/build"));

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on port ${port}`);
});
