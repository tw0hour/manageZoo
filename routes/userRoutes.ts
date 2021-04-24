import express from "express";
import {jwt, JWT_KEY, UserController} from "../controllers/userController";
import {authenticationUser} from '../middlewares/authentification';

const userRoutes = express();

userRoutes.post("/inscription", async function(req, res) {
    const name = req.body.name;
    const password = req.body.password;
    const is_handicapped = req.body.is_handicapped ? req.body.is_handicapped : false;

    if( name === undefined ||
        password === undefined) {
        res.status(400).end();
        return;
    }
    const userController = await UserController.getInstance();
    const user = await userController.inscription({
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



userRoutes.post("/connection", async function(req, res) {
    const userController = await UserController.getInstance();
    const name = req.body.name;
    const password = req.body.password;

    const user = await userController.connection(name, password);
    if(user) {
        res.status(200);
        res.json(user);
    } else {
        res.status(404).end();
    }
});

userRoutes.get("" /*, authMiddleware*/, async function(req, res) {

    const userController = await UserController.getInstance();
    const user = await userController.getAll();
    if(user) {
        res.status(200);
        res.json(user);
    } else {
        res.status(404).end();
    }
});




userRoutes.get("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;

    const userController = await UserController.getInstance();
    const user = await userController.getById(id);
    if(user) {
        res.status(200);
        res.json(user);
    } else {
        res.status(404).end();
    }
});

userRoutes.put("/:id",async function(req,res){
    const name = req.body.name ? req.body.name : null;
    const password = req.body.password ? req.body.password : null;
    const id = req.params.id;
    const is_handicapped = req.body.is_handicapped ? req.body.is_handicapped : null;

    if(!id || (!name && !password)) {
        res.status(400).end();
        return;
    }

    const userController = await UserController.getInstance();
    const user = await userController.update(id,{name, password, is_handicapped});
    if(user) {
        res.status(200);
        res.json(user);
    } else {
        res.status(404).end();
    }
});

userRoutes.post("/subscribe:idPass", authenticationUser,async function(req,res){
    const auth = req.headers["authorization"];
    let decoded;
    if(auth === undefined) {

        res.status(403).end();
    }else{
        const token = auth.slice(7);

        try{
            decoded = jwt.verify(token, JWT_KEY);
        }
        catch(err) {
            res.status(500).end();
        }
    }
    const idPass = req.params.idPass || null;
    console.log("idpass" + idPass);
    if(!idPass) {
        res.status(400).end();
        return;
    }

    const userController = await UserController.getInstance();
    const user = await userController.subscribe(decoded.id,idPass);
    console.log("user" + user);
    if(user) {
        res.status(200);
        res.json(user);
    } else {
        res.status(404).end();
    }
});

userRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;

    const userController = await UserController.getInstance();
    const user = await userController.delete(id);
    if(user) {
        res.status(200);
        res.json("user supprimé");
    } else {
        res.status(404).end();
    }
});




export {
    userRoutes
};


// const token = req.headers["x-access-token"];
// if (!token) return res.status(401).json('Unauthorize user');