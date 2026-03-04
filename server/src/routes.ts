import express from "express";
import { userController } from "./auth/module/user/userController.ts";

export const route = express.Router();

route.get('/users', userController.getAllUser);
// route.get('/users?email=', userController.getOneUser);
route.post('/users', userController.create);