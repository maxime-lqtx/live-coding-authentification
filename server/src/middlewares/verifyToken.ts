import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { IUser } from "../auth/module/user/userController.ts";
import UserModel from "../auth/module/user/userModel.ts";

dotenv.config();

export interface AuthRequest extends Request {
    user?: IUser
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Action non autorisée" })
        }

        const tokenDecode = jwt.verify(token, process.env.SECRET_KEY || "dgjshdfguykdshgdfkjhgfjdsf0011231141.20231$$") as { user_id: string, user_email: string, role: string }

        const [userIfExist] = await UserModel.getUserByEmail(tokenDecode.user_email) as IUser[]
        if (!userIfExist) {
            return res.status(401).json({ message: "Action non autorisée" });
        }

        req.user = userIfExist;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erreur du serveurs" });
    }


}