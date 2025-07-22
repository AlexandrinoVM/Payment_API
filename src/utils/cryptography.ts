import { hash } from "bcrypt"


export const encrypt =async (text:string,secret:number):Promise<string> =>{
    const crypt = await hash( text, secret);
    return crypt;
}   