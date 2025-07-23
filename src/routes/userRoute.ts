import { Router } from "express";
import { UserController } from "../controllers/userController";
import { middleware } from "../midlleware/middleware";

const userController = new UserController();
const userRoute = Router();

userRoute.post("/user", userController.createUser);
userRoute.get("/user/:id",middleware,userController.getUserById);

export { userRoute }