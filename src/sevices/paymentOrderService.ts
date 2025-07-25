import dotenv from "dotenv";
import { PaymentOrder } from "../types";
import { PaymentOrder as orderModel, paymentMethodEnum} from "../models/paymentOrder";
import { productsServices } from "./productsServices";
import { transactionService } from "./transactionService";
import { invoceService } from "./invoiceService";

dotenv.config();

export class PaymentOrderService {
    static async createPaymentOrder(data: PaymentOrder, UserId: number): Promise<orderModel> {
        if (!data.paymentMethod) {
            throw new Error('Missing required fields:  paymentMethod');
        }

        if (data.productsIds.length === 0) {
            throw new Error('At least one product must be included in the order');
        }

        const products = await productsServices.getAllProducts(data.productsIds);


        if (products.length === 0) {
            throw new Error('No products found for the provided IDs');
        }
        const totalAmount = products.reduce((sum, product) => sum + Number(product.price),0);
        data.amount = totalAmount;
        //creating the payment order
        const payment_order = await orderModel.create({
           userId: UserId,
           amount:data.amount,
           paymentStatusId: 1, //always start with pending status 
           paymentMethod: data.paymentMethod,
       });


       if(payment_order.paymentMethod === paymentMethodEnum.CREDIT_CARD || payment_order.paymentMethod === paymentMethodEnum.PAYPAL) {
           await invoceService.createInvoice(payment_order.id, payment_order.amount, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); //due date is 30 days from now
       }else if(payment_order.paymentMethod === paymentMethodEnum.BANK_TRANSFER || payment_order.paymentMethod === paymentMethodEnum.CASH) {
              await invoceService.createInvoice(payment_order.id, payment_order.amount, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); //due date is 7 days from now
       } else if(payment_order.paymentMethod === paymentMethodEnum.CRYPTOCURRENCY || payment_order.paymentMethod === paymentMethodEnum.PIX) {
              await invoceService.createInvoice(payment_order.id, payment_order.amount, new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)); //due date is 1 day from now
       }

       //creating the transaction log
       const newTransaction = await transactionService.createTransaction(UserId, payment_order.id);

       return payment_order;
    }
    static async getPaymentOrderById(id: number): Promise<orderModel | null> {
        const paymentOrder = await orderModel.findByPk(id);
        return paymentOrder;
    }
    static async updatePaymentOrder(id: number, data: Partial<PaymentOrder>): Promise<orderModel | null> {
        const paymentOrder = await orderModel.findByPk(id);
        if (paymentOrder) {
            if(data.paymentStatusId){
                paymentOrder.paymentStatusId = data.paymentStatusId;
            }
            await paymentOrder.save();
            return paymentOrder;
        }
        return null;
    }
}