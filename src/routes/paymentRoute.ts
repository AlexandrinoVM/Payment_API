import { Router } from "express";
import { paymentController } from "../controllers/paymentController";
import { middleware } from "../midlleware/middleware";


const paymentRoute = Router();

paymentRoute.post("/payment", middleware, paymentController.CreatePaymentOrder);
export { paymentRoute }