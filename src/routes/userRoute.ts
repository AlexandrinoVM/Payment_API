import { Router } from "express";
import { UserController } from "../controllers/userController";
import { middleware } from "../midlleware/middleware";
import { authController } from "../controllers/authController";

const userController = new UserController();
const userRoute = Router();

userRoute.post("/user", userController.createUser);
userRoute.get("/user/:id",middleware,userController.getUserById);
userRoute.post("/user/login",authController.authenticate);
export { userRoute }