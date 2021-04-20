import {jwt, JWT_KEY} from "../controllers/userController";
import express from "express";
import {EmployeeController} from "../controllers/employeeController";



export async function authenticationUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.headers["authorization"]; // la c le token envoyer
    if(auth !== undefined){
        const token = auth.slice(7);
        let decoded;
        try{
            decoded = jwt.verify(token, JWT_KEY);
        }
        catch(err) {
            res.status(500).end();
        }
        const employeeController = await EmployeeController.getInstance()
        const employee = await employeeController.getById(decoded.id);
        if(employee === null){
            res.status(404).end();
        }else{
            if (employee.type === "admin"){
                next();
                return;
            }else{
                res.status(403).end();
            }
        }
    }else{
        res.status(401).end();
    }
}

