import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./src/config/db.config";
import { userRouter } from "./src/routes/user.routes";

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const port = process.env.PORT;

db.then(() => {
  app.listen(port, () => console.log("Server is listening on port", port));
}).catch((err: any) => console.log("Error starting server....", err));

app.use("/api/v1/user", userRouter);
