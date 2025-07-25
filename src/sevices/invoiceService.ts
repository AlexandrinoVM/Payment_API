import { Invoice } from "../models/invoice";



export class invoceService{
    static async createInvoice(paymentOrderId: number, amount: number, dueDate: Date): Promise<Invoice> {
        const invoice = await Invoice.create({
            paymentOrderId,
            amount,
            dueDate
        });
        return invoice;
    }
    static async getInvoiceById(id: number): Promise<Invoice | null> {
        const invoice = await Invoice.findByPk(id);
        return invoice;
    }
    static async updateInvoice(id: number, amount: number, dueDate: Date): Promise<Invoice | null> {
        const invoice = await Invoice.findByPk(id);
        if (invoice) {
            invoice.amount = amount;
            invoice.dueDate = dueDate;
            await invoice.save();
            return invoice;
        }
        return null;
    }
    static async deleteInvoice(id: number): Promise<void> {
        const invoice = await Invoice.findByPk(id);
        if (invoice) {
            await invoice.destroy();
        }
    }
    static async getAllInvoices(): Promise<Invoice[]> {
        const invoices = await Invoice.findAll();
        return invoices;
    }
}