import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { publicRouter } from "../routes/public-api.js";
import { userRouter } from "../routes/api.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";

export const web = express();
web.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

web.use(express.json());
web.use(cookieParser());

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
