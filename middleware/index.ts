import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET;

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    next();
    const token = authHeader.split(" ")[1];
    if (SECRET) {
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          res.sendStatus(403);
        } else {
          next();
        }
      });
    }
  } else {
    res.sendStatus(401);
  }
};
