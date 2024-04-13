import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const publicRouter = new express.Router();

//  User API
publicRouter.post("/api/auth/register", register);
publicRouter.post("/api/auth/login", login);

export { publicRouter };
