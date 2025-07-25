import { PaymentOrderService } from "../sevices/paymentOrderService";
import { Response, Request } from "express";

export class paymentController {
    static async CreatePaymentOrder(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.userId, 10);
            const paymentOrder = await PaymentOrderService.createPaymentOrder(req.body, userId);
            return res.status(201).json(paymentOrder);
        } catch (error) {
            console.error('Error creating payment order:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}   