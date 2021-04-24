import express from "express";
import {EmployeeController, jwt, JWT_KEY} from "../controllers/employeeController";
import {UserController} from "../controllers/userController";
import {authenticationAdmin} from "../middlewares/authentification";

const employeeRoutes = express();

employeeRoutes.get("/:id",authenticationAdmin,async function(req,res){
    const id = req.params.id;
    const employeeController = await EmployeeController.getInstance();
    const employee = await employeeController.getById(id);
    if(employee)return res.status(200).json(employee);
    return res.status(404).end();
});

employeeRoutes.get("" ,authenticationAdmin, async function(req, res) {

    const employeeController = await EmployeeController.getInstance();
    const employee = await employeeController.getAll();

    if(employee) {
        res.status(200);
        res.json(employee);
    } else {
        res.status(404).end();
    }
});

employeeRoutes.post("/new", async function(req, res) {
    const pseudo = req.body.pseudo;
    const password = req.body.password;
    const state = req.body.state ? req.body.state : false;
    const type = req.body.type;
    if( pseudo === undefined ||
        password === undefined ||
        type === undefined) {
        res.status(400).end();
        return;
    }
    const employeeController = await EmployeeController.getInstance();
    const employee = await employeeController.subscribe({
        pseudo,
        password,
        type,
        state
    });
    return res.status(employee.statusCode).json(employee);

});

employeeRoutes.post("/log", async function(req, res) {
    const pseudo = req.body.pseudo;
    const password = req.body.password;
    if( pseudo === undefined ||
        password === undefined) {
        res.status(400).end();
        return;
    }
    const employeeController = await EmployeeController.getInstance();
    const employee = await employeeController.connection(pseudo, password);
    return res.status(employee.statusCode).json(employee);

});

employeeRoutes.put("/:id",async function(req,res){
    const id = req.params.id;

    const pseudo = req.body.pseudo;
    const password = req.body.password;
    const state = req.body.state ? req.body.state : false;
    const type = req.body.type;

    if(!id || (!pseudo && !password && !state && !type)) {
        res.status(400).end();
        return;
    }
    // on vérifie que c'est bien l'employé qui veut modifier ses informations personnels
    const auth = req.headers["authorization"];
    if(auth !== undefined) {
        const token = auth.slice(7);
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_KEY);
        } catch (err) {
            res.status(500).end();
        }
        // l'id doit etre le meme: seul l'employé peut modifier ses propres infos
        if(decoded.id != id){res.status(403).end();return;}
    }else {res.status(401).end();return;}

    const employeeController = await EmployeeController.getInstance();
    const employee = await employeeController.update(id,{
        pseudo,
        password,
        state,
        type
    });
    if(employee)return res.status(200).json(employee);
    return res.status(404).end();
});

employeeRoutes.delete("/:id",authenticationAdmin, async function(req, res) {
    const id = req.params.id;

    const employeeController = await EmployeeController.getInstance();
    const employee = await employeeController.delete(id);
    if(employee) {
        res.status(200);
        res.json("employee supprimé");
    } else {
        res.status(404).end();
    }
});

export {
    employeeRoutes
};