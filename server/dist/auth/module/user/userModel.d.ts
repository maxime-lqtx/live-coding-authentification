import type { IUser } from "./userController.ts";
export default class UserModel {
    static getAll(): Promise<unknown>;
    static getUserByEmail(email: string): unknown;
    static createUser(user: IUser): Promise<unknown>;
}
//# sourceMappingURL=userModel.d.ts.map