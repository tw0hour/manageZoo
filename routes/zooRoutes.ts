import express from "express";
import {ZooController} from "../controllers/zooController";

const zooRoutes = express();

zooRoutes.get("/:id",async function(req,res){
    const zooController = await ZooController.getInstance();
    const zoo = await zooController.getById(req.params.id);
    if(zoo === null){
        res.status(404).end();
    }else{
        res.json(zoo);
    }
});

zooRoutes.get("/",async function(req,res){
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 1;
    const zooController = await ZooController.getInstance();
    const zooList = await zooController.getAll(limit, offset);

    if(zooList !== null)
    {
        res.json(zooList);
        res.status(201).end();
    }
    else
    {
        res.status(409).end();
    }
});

// zooRoutes.post("/", async function(req, res) {
//     const name = req.body.name;
//
//     if(name === undefined){
//         res.status(400).end();
//         return;
//     }
//     const zooController = await zooController.getInstance();
//     const zoo = await zooController.add({
//
//         name
//     });
//     if(zoo !== null) {
//         res.status(201);
//         res.json(zoo);
//     }else {
//         res.status(404).end();
//     }
//
// });
//
zooRoutes.put("/:id",async function(req,res){
    const id = req.params.id;

    if(id === null)
    {
        res.status(400).end();
        return;
    }

    const zooController = await ZooController.getInstance();
    const zoo = await zooController.update({
        id
    });
    if(zoo === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(zoo);
    }
});

zooRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;

    if(id === null)
    {
        res.status(400).end();
    }
    const zooController = await ZooController.getInstance();
    const zooRemove = await zooController.removeById(id);

    if(zooRemove)
    {
        res.status(204).end();
    }
    else
    {
        res.status(404).end();
    }

});

export {
    zooRoutes
};