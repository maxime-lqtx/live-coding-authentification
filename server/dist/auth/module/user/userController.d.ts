import type { Request, Response } from "express";
export type IUser = {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
};
export declare class userController {
    static getAllUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getOneUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=userController.d.ts.map