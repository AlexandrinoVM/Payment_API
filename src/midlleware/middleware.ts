import { NextFunction,Response,Request } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

type tokenPayload = {
    id: string;
    iat: number;
    exp: number;
};

export function middleware(req:Request, res:Response, next:NextFunction){
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const [ , token] = authorization.split(' ');

    if(!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }

    try {
        const decode = verify(token,process.env.SECRETE || 'default');
        const { id } = decode as tokenPayload;
        req.userId = id;
        next();
        
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}