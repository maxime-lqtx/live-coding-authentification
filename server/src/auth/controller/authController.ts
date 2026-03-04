import type { Request, Response } from "express";
import UserModel from "../module/user/userModel.ts";
import type { IUser } from "../module/user/userController.ts";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class AuthController {
    
    // Verification des données recu
    // Chercher if user exist => mail
        // Comparer mdp / mdp bdd
            // Si Oui => connexion + JWT + Envoie JWT en cookie to user
            // Si non => erreur 401

    static async login(req : Request, res : Response) {
        try{
            if(!req.body){
                return res.status(404).json()
            }
            // Si adresse mail / mot de passe respect la structure imposé par le projet
            
            const [user] = await UserModel.getUserByEmail(req.body.email) as IUser[];
            if(user && Object.keys(user).length === 0){
                return res.status(401).json({ message: "Non autorisé" });
            }
            if(user){
                // console.log("user ====>", user);
                const isValidPassword = await argon2.verify(user.password, req.body.password);
                if(isValidPassword){
                    const token = jwt.sign({ user_id : user.id, role: "user"}, process.env.SECRET_KEY || "12345", {});
                    return res.status(200).json({ message : "pfjvzpo", token });
                } else {
                    return res.status(401).json({ message : "Identifiants invalides" })
                }
            }
        } catch {
            res.status(500).json({ message : 'erreur'});
        }
    }
}