import { TransactionLog } from "../models/transactionLog";
import {generateTransactionID} from "../utils/generateTransactionID";

export class transactionService {
    static async createTransaction(userId: number, orderId: number): Promise<TransactionLog> {
        try {
            const transactionID = await generateTransactionID(userId, orderId);
            
            const newTransaction = await TransactionLog.create({
                paymentOrderId: orderId,
                transactionId: transactionID,
            });
            return newTransaction;
        } catch (error) {
            console.error('Error generating transaction ID:', error);
            throw new Error('Failed to generate transaction ID');
        }
    }
}