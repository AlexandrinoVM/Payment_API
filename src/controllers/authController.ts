import { authService } from "../sevices/authService";
import { Response, Request } from "express";

export class authController {
    static async authenticate(req: Request, res: Response): Promise<Response> {
        try{
            const {email,password}= req.body;
            const user = await authService.authenticateUser(email,password)
            return res.status(200).json({message: 'User authenticated successfully', token:user});
        }catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}