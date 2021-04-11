import express from "express";
import {UserController} from "../controllers/userController";

const employeeRoutes = express();

employeeRoutes.get("/employee:id",async function(req,res){
    res.send("get " + req.params.id);
});

employeeRoutes.post("/addEmployee", async function(req, res) {
    const name = req.body.pseudo;
    const password = req.body.password;
    const is_handicapped = req.body.is_handicapped ? req.body.is_handicapped : false;
    if( name === undefined ||
        password === undefined) {
        res.status(400).end();
        return;
    }
    const userController = await UserController.getInstance();
    const user = await userController.subscribe({
        name,
        password,
        is_handicapped
    });
    if(user !== null) {
        res.status(201);
        res.json(user);
    } else {
        res.status(409).end();
    }
});

employeeRoutes.put("/modifyEmployee:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

employeeRoutes.delete("/delEmployee" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    employeeRoutes
};