import express from "express";
import {UserController} from "../controllers/userController";

const userRoutes = express();

userRoutes.get("/:id",async function(req,res){
    res.send("get " + req.params.id);
});

userRoutes.post("/add", async function(req, res) {
    const name = req.body.name;
    const password = req.body.password;
    const is_handicapped = req.body.is_handicapped;
    if( name === undefined ||
        password === undefined ||
        is_handicapped === undefined) {
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
    //res.send("post");
});

userRoutes.put("/modify:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

userRoutes.delete("/del" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    userRoutes
};