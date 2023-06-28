import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { router } from "src/routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.json({ limit: process.env.MAX_REQUEST_SIZE }));

app.use(router);

export { app };

// REQ -> ROUTES -> CONTROLLER(RES) <--> USERCASE <--> REPOSITORY <--> PRISMA <--> DATABASE
