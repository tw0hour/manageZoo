import express from "express";
import {VisitController} from "../controllers/visitController";

const visitRoutes = express();

visitRoutes.get("/:id",async function(req,res){
    const visitController = await VisitController.getInstance();
    const visit = await visitController.getById(req.params.id);
    if(visit === null){
        res.status(404).end();
    }else{
        res.json(visit);
    }
});

visitRoutes.get("/",async function(req,res){
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 1;
    const visitController = await VisitController.getInstance();
    const visitList = await visitController.getAll(limit, offset);

    if(visitList !== null)
    {
        res.json(visitList);
        res.status(201).end();
    }
    else
    {
        res.status(409).end();
    }
});

visitRoutes.post("/stats", async function (req,res){
    const visitController = await VisitController.getInstance();
    const stats = await visitController.statistics();

    if(stats !== null){
        res.json(stats);
        res.status(201);
    }
    else
    {
        res.status(409).end();
    }
});

// visitRoutes.post("/", async function(req, res) {
//     const name = req.body.name;
//
//     if(name === undefined){
//         res.status(400).end();
//         return;
//     }
//     const visitController = await VisitController.getInstance();
//     const visit = await visitController.add({
//
//         name
//     });
//     if(visit !== null) {
//         res.status(201);
//         res.json(visit);
//     }else {
//         res.status(404).end();
//     }
//
// });
//
// visitRoutes.put("/:id",async function(req,res){
//     const id = req.params.id;
//
//     if(id === null)
//     {
//         res.status(400).end();
//         return;
//     }
//
//     const visitController = await VisitController.getInstance();
//     const visit = await visitController.update({
//         id
//     });
//     if(visit === null)
//     {
//         res.status(404).end();
//     }
//     else
//     {
//         res.json(visit);
//     }
// });

visitRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;

    if(id === null)
    {
        res.status(400).end();
    }
    const visitController = await VisitController.getInstance();
    const visitRemove = await visitController.removeById(id);

    if(visitRemove)
    {
        res.status(204).end();
    }
    else
    {
        res.status(404).end();
    }

});

export {
    visitRoutes
};