import { Router } from "express";
import { authController } from "../controllers/authController";

const authRoute = Router();

authRoute.post("/auth/", authController.authenticate);

export { authRoute };