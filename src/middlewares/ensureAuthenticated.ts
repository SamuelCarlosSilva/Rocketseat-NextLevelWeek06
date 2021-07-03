import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayload { 
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    //Receber o token
    const authToken = request.headers.authorization
    //console.log(authToken)


    //Validar se o token está preenchido

    if(!authToken){
        return response.status(401).end(); 

    }

    //Verificar se o token é válido 
    const [,token] = authToken.split(" ")

    

    try {
        const {sub} = verify(token, "ae2f8a73670cf2614f7734ed96e69974") as IPayload

        request.user_id = sub;

        return next();
        
    } catch (error) {

        return response.status(401).end()
    }


    //Recuperar informações do usuário 
    

    return next();
}