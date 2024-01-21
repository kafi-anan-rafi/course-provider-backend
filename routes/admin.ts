import express, { Request, Response } from "express";
import { authenticateJwt } from "../middleware";
export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Admin...");
});
