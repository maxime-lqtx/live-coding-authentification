import UserModel from "./userModel.ts";
import type { Request, Response } from "express";

export type IUser = {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

export class userController {
    static async getAllUser(req: Request, res: Response) {
        try {
            const users = await UserModel.getAll() as IUser[];
            console.log(users);

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).send('error:'+ error)
        }
    }

    static async getOneUser(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const [user] = await UserModel.getUserByEmail(email) as IUser[];
            return res.status(200).json(user);
        } catch (error) {
            // console.log(error);
            return res.status(500).send('error:'+ error)
        }
    }

    static async create(req: Request, res: Response) {
        try {
            if(!req.body){
                return res.status(404).json()
            }
            const result = await UserModel.createUser(req.body) as IUser[];
            return res.status(201).json({ message: "Utilisateur créé",  result });
        } catch (error) {
            // return res.status(500).send(error);
            console.error(error);
        }
    }
}