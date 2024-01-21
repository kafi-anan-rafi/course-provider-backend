import express, { Request, Response } from "express";
import { User } from "../db";
import jwt from "jsonwebtoken";
export const router = express.Router();
const SECRET = process.env.SECRET;

router.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ msg: "User already exists...!" });
  } else {
    if (SECRET) {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "User created successfully", token });
    } else {
      console.error("SECRET environment variable is not defined.");
    }
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user && SECRET) {
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});
