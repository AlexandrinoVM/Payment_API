import { PaymentStatus } from "../models/paymentStatus";

async function seedPaymentStatuses() {
    await PaymentStatus.bulkCreate([
        { status: 'pending', description: 'await for payment' },
        { status: 'paid', description: 'payment Aproved' },
        { status: 'failed', description: 'Payment failed' },
        { status: 'refunded', description: 'Payment refunded' },

    ],{
        ignoreDuplicates: true, 
    })
    console.log('Payment statuses seeded successfully');

}

export default seedPaymentStatuses;