import { UserService } from "../sevices/user";
import { Response, Request } from "express";
import { UserType } from "../types";

export class UserController {
    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userData: UserType = req.body;
            const newUser = await UserService.CreateUser(userData);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    }
    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await UserService.GetUserById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id, 10);
            const updatedData: Partial<UserType> = req.body;
            const updatedUser = await UserService.UpdateUser(userId, updatedData);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id, 10);
            await UserService.DeleteUser(userId);
            return res.status(204).json({message: 'User deleted successfully'});
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}