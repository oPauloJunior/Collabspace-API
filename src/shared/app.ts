import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import "reflect-metadata";
import "./container";

import { router } from "@routes/index";
import { AppError } from "@helpers/errorsHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.json({ limit: process.env.MAX_REQUEST_SIZE }));

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      result: error.result,
      message: error.message,
    });
  }

  return res.status(500).json({
    result: "error",
    message: `Internal server error - ${error.message}`,
  });
});

export { app };

// REQ -> ROUTES -> CONTROLLER(RES) <--> USERCASE <--> REPOSITORY <--> PRISMA <--> DATABASE
