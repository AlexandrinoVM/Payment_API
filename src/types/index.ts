export interface UserType {
    name: string;
    email: string;
    password: string;
}

export interface authUserType extends UserType {
    token: string;
}

export interface PaymentOrder {
    id: number;
    userId: number;
    amount: number;
    status: string;
}

export interface Invoice {
    id: number;
    paymentOrderId: number;
    amount: number;
    dueDate: Date;
}

export interface TransactionLog {
    id: number;
    paymentOrderId: number;
    transactionId: string;
    timestamp: Date;
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
    id: number;
    name: string;
    description: string;
    price: number;
}