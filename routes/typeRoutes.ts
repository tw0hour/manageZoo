import express from "express";
import {TypeController} from "../controllers/TypeController";


const typeRoutes = express();

typeRoutes.get("/",async function(req,res){
    const limit = parseInt(req.query.limit as string) | 10;
    const offset = parseInt(req.query.offset as string) | 1;
    const typeController = await TypeController.getInstance();
    const typeList = await typeController.getAll(limit,offset);
    if(typeList!==null){
        res.json(typeList);
        res.status(201).end();
    }else {
        res.status(409).end();
    }
});

typeRoutes.get("/:id",async function(req,res){

    const id = parseInt(req.query.id as string);
    if(id===undefined){
        res.status(400).end();
        return;
    }
    const typeController = await TypeController.getInstance();
    const type = await typeController.getById(id);
    if(type!==null){
        res.json(type);
        res.status(201).end();
    }else {
        res.status(409).end();
    }

});

typeRoutes.post("/addType", async function(req, res) {
    const name = req.body.name;
    if(name===undefined){
        res.status(400).end();
        return;
    }
    const typeController = await TypeController.getInstance();
    const type = await typeController.addType({
        name: name
    });
    if(type!==null){
        res.status(201).end();
        res.json(type);
    }else {
        res.status(409).end();
    }
    //res.send("post");
});

typeRoutes.put("/update:id",async function(req,res){

    res.send("modifier" + req.params.id);
});

typeRoutes.delete("/delType" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    typeRoutes
};