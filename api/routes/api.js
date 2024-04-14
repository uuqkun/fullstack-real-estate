import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = new express.Router();
userRouter.use(verifyToken);

const baseUrl = "/api/users";

userRouter.get(`${baseUrl}`, getUsers);
userRouter.get(`${baseUrl}/:id`, getUser);
userRouter.put(`${baseUrl}/:id`, updateUser);
userRouter.delete(`${baseUrl}/:id`, deleteUser);

export { userRouter };
