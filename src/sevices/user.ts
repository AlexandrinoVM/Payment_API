import { Response,Request } from "express";
import { User as UserModel} from "../models/user";
import { UserType} from "../types";
import { encrypt } from "../utils/cryptography";
import dotenv from "dotenv";

dotenv.config();


export class UserService{
    static async CreateUser(data:Partial<UserType>):Promise<UserModel | null> {
        
        const existingUser = await UserModel.findOne({ where: { email: data.email } });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const hashedPassword = await encrypt(data.password, process.env.HASH_SECRET ? parseInt(process.env.HASH_SECRET) : 8); 
        const user = await UserModel.create({name:data.name, email:data.email, password: hashedPassword}); 
        return user;
    }

    static async GetUserById(id: number): Promise<UserType | null> {
        const user = await UserModel.findByPk(id);
        return user;
    }

    static async UpdateUser(id: number, data: Partial<UserType>): Promise<UserType | null> {
        const user = await UserModel.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        await user.update(data);
        return user;
    }

    static async DeleteUser(id: number): Promise<void> {
        const user = await UserModel.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
    }

}


