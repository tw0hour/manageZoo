import express from "express";
import {TypeController} from "../controllers/TypeController";
import {AnimalController} from "../controllers/animalController";


const typeRoutes = express();


typeRoutes.get("/",async function(req,res){
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 1;
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
    const id = req.params.id;
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


typeRoutes.post("/", async function(req, res) {
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
        res.status(201);
        res.json(type);
    }else {
        res.status(409).end();
    }
    //res.send("post");
});


typeRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const name = req.body.name;

    if(id === null)
    {
        res.status(400).end();
        return;
    }

    const typeController = await TypeController.getInstance();
    const type = await typeController.update({
        id:id,
        name
    });
    if(type === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(type);
    }
});


typeRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;

    if(id === null)
    {
        res.status(400).end();
    }
    const typeController = await TypeController.getInstance();
    const typeRemove = await typeController.removeById(id);

    if(typeRemove)
    {
        res.status(204).end();
    }
    else
    {
        res.status(404).end();
    }
});


export {
    typeRoutes
};