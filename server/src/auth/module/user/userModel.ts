
import { db } from "../../../data/db.config.ts"

import type { IUser } from "./userController.ts";

export default class UserModel {
    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM user');
            return rows;
        } catch (error) {
            return error;
        }
    }

    static getUserByEmail(email: string) {
        try {
            const user = db.query('SELECT * FROM user WHERE email = ?',
                [email]
            );
            return user;
        } catch (error) {
            return error;
        }
    }


    static async createUser(user: IUser) {
        try {
            const [result] = await db.query('INSERT INTO user (firstname, lastname, email, password) VALUES(?,?,?,?)',
                // ajouter chaque valeur
                [user.firstname, user.lastname, user.email, user.password]
            );
            return result;
        } catch (error) {
            return error;
        }
    }

}