import dotenv from "dotenv";
import { PaymentOrder } from "../types";
import { PaymentOrder as orderModel} from "../models/paymentOrder";
import { ProductService } from "../models/productService";
import { extractUserIdFromToken } from "../utils/geIdAuthenticate";
import { productsServices } from "./productsServices";
import { transactionService } from "./transactionService";

dotenv.config();


 

export class PaymentOrderService {
    async createPaymentOrder(data: PaymentOrder, UserId: number): Promise<orderModel> {
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


        const payment_order = await orderModel.create({
           userId: UserId,
           amount:totalAmount,
           paymentStatusId: 1, //always start with pending status 
           paymentMethod: data.paymentMethod,
       });

       const newTransaction = await transactionService.createTransaction(UserId, payment_order.id);


       return payment_order;
    }
}