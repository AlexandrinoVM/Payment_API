export interface UserType {
    name: string;
    email: string;
    password: string;
}

export interface authUserType extends UserType {
    token: string;
}


enum paymentMethodEnum{
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CRYPTOCURRENCY = 'cryptocurrency',
  CASH = 'cash',
  PIX = 'pix',
}


export interface PaymentOrder {
    amount: number;
    paymentMethod: paymentMethodEnum;
    paymentStatusId?: number; // Optional, will default to pending
    productsIds: number[];
}

export interface Invoice {
    id: number;
    paymentOrderId: number;
    amount: number;
    dueDate: Date;
}

export interface TransactionLog {
    paymentOrderId: number;
    transactionId: string;
}

export interface Refund {
    id: number;
    paymentOrderId: number;
    amount: number;
    reason: string;
}

export interface PaymentStatus {
    id: number;
    status: string;
    description: string;
}

export interface ProductService {
    name: string;
    description: string;
    price: number;
}