import { Router } from "express";
import { UserController } from "../controllers/userController";

const userController = new UserController();
const userRoute = Router();

userRoute.post("/user", userController.createUser);
userRoute.get("/user/:id", userController.getUserById);

export { userRoute }