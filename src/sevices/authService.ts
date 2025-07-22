import { compare } from "bcrypt";
import { User as UserModel } from "../models/user";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



export class authService {
    static async authenticateUser(email:string, password: string):Promise<string | null> {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        
        const token = sign({ id:user.id }, process.env.SECRETE || 'default',{expiresIn: '1h'});

        return token;
    }
}