import express from "express";
import {PassController} from "../controllers/passController";


const passRoutes = express();

passRoutes.get("/getById:id",async function(req,res){
    const passController = await PassController.getInstance();
    const pass = await passController.getById(req.params.id);
    if(pass === null){
        res.status(404).end();
    }else{
        res.json(pass);
    }
});

passRoutes.get("/getAllPass",async function(req,res){
    const limit = parseInt(req.query.limit as string) | 10;
    const offset = parseInt(req.query.offset as string) | 1;
    const passController = await PassController.getInstance();
    const passList = await passController.getAllPass(limit, offset);

    if(passList !== null)
    {
        res.json(passList);
        res.status(201).end();
    }
    else
    {
        res.status(409).end();
    }
});

passRoutes.post("/add", async function(req, res) {
    const type = req.body.type;
    const description = req.body.description;
    const price = req.body.price;

    if(type === undefined || description === undefined || price === undefined){
        res.status(400).end();
        return;
    }
    const passController = await PassController.getInstance();
    const pass = await passController.addPass({
        type,
        description,
        price
    });
    if(pass !== null) {
        res.status(201);
        res.json(pass);
    }else {
        res.status(404).end();
    }

});

passRoutes.put("/modify:id",async function(req,res){
    const id = req.params.id;
    const type = req.body.type;
    const description = req.body.description;
    const price = req.body.price;

    if(id === null)
    {
        res.status(400).end();
        return;
    }

    const passController = await PassController.getInstance();
    const pass = await passController.updatePass({
        id,
        type,
        description,
        price
    });
    if(pass === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(pass);
    }
});

passRoutes.delete("/removePassById:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;

    if(id === null)
    {
        res.status(400).end();
    }
    const passController = await PassController.getInstance();
    const passRemove = await passController.removePassById(id);

    if(passRemove)
    {
        res.status(204).end();
    }
    else
    {
        res.status(404).end();
    }

});

export {
    passRoutes
};