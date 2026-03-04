import type { ResultSetHeader } from "mysql2";
import UserModel from "./userModel.ts";
import type { Request, Response } from "express";
import * as argon2 from "argon2";

export type IUser = {
    id?: number;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

export class userController {
    static async getAllUser(req: Request, res: Response) {
        try {
            const users = await UserModel.getAll() as IUser[];
            // console.log(users);

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

            const [user] = await UserModel.getUserByEmail(req.body.email) as IUser[];
            if(user && Object.keys(user).length !== 0){
                return res.status(401).json({ message: "Non autorisé"});
            }

            const hashedOptions = {
                type: argon2.argon2id,
                memoryCost: 19456,      // 19 MiB
                timeCost: 2,            // 2 iterations
                parallelism: 1          // 1 thread
            };
            const hashedPassword = await argon2.hash(req.body.password, hashedOptions);
            const newUser = {
                ...req.body, password : hashedPassword,
            }
            const result = await UserModel.createUser(newUser) as ResultSetHeader;
            
            if(result.insertId){
                res.status(201).json({ message: "Utilisateur créé",  result });
            } else {
                res.status(500).json({ message: "Erreur"});
            }
        } catch (error) {
            // return res.status(500).send(error);
            console.error(error);
        }
    }
}