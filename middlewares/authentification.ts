import {jwt, JWT_KEY, UserController} from "../controllers/userController";
import express from "express";
import {EmployeeController} from "../controllers/employeeController";

export async function authenticationAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
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

// export async function authenticationEmployeeNotAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
//     const auth = req.headers["authorization"]; // la c le token envoyer
//     if(auth !== undefined){
//         const token = auth.slice(7);
//         let decoded;
//         try{
//             decoded = jwt.verify(token, JWT_KEY);
//         }
//         catch(err) {
//             res.status(500).end();
//         }
//         const employeeController = await EmployeeController.getInstance()
//         const employee = await employeeController.getById(decoded.id);
//         if(employee === null){
//             res.status(404).end();
//         }else{
//             if (employee.type !== "admin"){
//                 next();
//                 return;
//             }else{
//                 res.status(403).end();
//             }
//         }
//     }else{
//         res.status(401).end();
//     }
// }

export async function authenticationEmployees(req: express.Request, res: express.Response, next: express.NextFunction) {
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
        }
        else{
            next();
            return;
        }
    }
    else{
        res.status(401).end();
    }
}

export async function authenticationVeterinary(req: express.Request, res: express.Response, next: express.NextFunction) {
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
            if (employee.type === "veterinaire" || employee.type ==="admin"){
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

export async function authenticationMaintenanceAgent(req: express.Request, res: express.Response, next: express.NextFunction) {
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
            if (employee.type === "agent entretien" || employee.type ==="admin"){
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

export async function authenticationUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.headers["authorization"];
    if(auth !== undefined){
        const token = auth.slice(7);
        let decoded;
        try{
            decoded = jwt.verify(token, JWT_KEY);
        }
        catch(err) {
            res.status(500).end();
        }

        const userController = await UserController.getInstance()
        const user = await userController.getById(decoded.id);

        const employeeController = await EmployeeController.getInstance()
        const admin = await employeeController.getById(decoded.id);
        if(user || admin){
            next();
            return;
        }
        res.status(404).end();
    }
    res.status(401).end();
}


