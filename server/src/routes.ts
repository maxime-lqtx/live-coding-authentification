import express from "express";
import { userController } from "./auth/module/user/userController.ts";

export const route = express.Router();

route.get('/users', userController.getAllUser);
route.get('/user/:email', userController.getOneUser);
route.post('/user', userController.create);