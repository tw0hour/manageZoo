import {jwt, JWT_KEY} from "../controllers/userController";


export async function authenticationUser(token:string) : Promise<string | null>{
    token = token.slice(7);

    try{
        let decoded = jwt.verify(token, JWT_KEY);
        return decoded.id;
    }
    catch(err) {
        return null;
    }
}

