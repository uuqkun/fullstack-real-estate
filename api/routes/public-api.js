import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const publicRouter = new express.Router();

const authUrl = '/api/auth';
//  User API
publicRouter.post(`${authUrl}/register`, register);
publicRouter.post(`${authUrl}/login`, login);
publicRouter.post(`${authUrl}/logout`, logout);

export { publicRouter };
