import express from "express";
import { userController } from "./auth/module/user/userController.ts";
import authController from "./auth/controller/authController.ts";

export const route = express.Router();

route.get('/users', userController.getAllUser);
// route.get('/users?email=', userController.getOneUser);
route.post('/users', userController.create);

route.post('/login', authController.login);