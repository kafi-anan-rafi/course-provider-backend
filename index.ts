import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
import { Request, Response } from "express";
import { router as adminRouter } from "./routes/admin";
import { router as userRouter } from "./routes/user";

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Hello World!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});

if (process.env.DB_URL && process.env.DB_NAME) {
  mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });
} else {
  console.error("DB_URL or DB_NAME environment variables are not defined.");
}
