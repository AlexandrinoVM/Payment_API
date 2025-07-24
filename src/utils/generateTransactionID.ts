export async function generateTransactionID(userId: number, orderId: number): Promise<string> {
    const timestamp = Date.now();
    const uniqueID = `${userId}-${orderId}-${timestamp}`;
    return uniqueID;
}