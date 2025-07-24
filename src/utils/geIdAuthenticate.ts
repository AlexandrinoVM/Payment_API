import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


interface DecodedToken {
    id: number
    iat: number
    exp: number
}


export function extractUserIdFromToken(token: string): number | null {
    try {
        const decoded = verify(token, process.env.SECRETE || 'default') as DecodedToken;
        return decoded.id;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}