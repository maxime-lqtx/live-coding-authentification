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
          const {email, password } = req.body
          if(!email || !password){
                return res.status(400).json({message: "Identifiant requise"})
          }
          const [userIfExist] = await UserModel.getUserByEmail(email) as IUser[]
          if(!userIfExist){
            return res.status(401).json({message: "Crendential not valide"})
          }
          const isValidePassword = await argon2.verify(userIfExist[0] ? userIfExist[0].password : 'null' ,password)
          if(!isValidePassword){
            return res.status(401).json({message: "Crendential not valide"})
          }
          const generateToken = jwt.sign({user_id: userIfExist[0] && userIfExist[0].id , user_email: userIfExist[0] && userIfExist[0]?.email, role: "user"},process.env.SECRET_KEY || "ejgjdfgg551" , {
            expiresIn: "30d"
          } )
            res
            .cookie('access_token', `Bearer ${generateToken}`, {
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            })
          return res.status(200).json({
            message: "Connexion réussit",
            
          })

        } catch (err){
            console.log('err :>> ', err);
            res.status(500).json({ message : 'erreur'});
        }
    }
}