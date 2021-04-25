import express from "express";
import {SpaceNoteBookController} from "../controllers/SpaceNotebookController";
import {authenticationAdmin, authenticationMaintenanceAgent} from "../middlewares/authentification";

const spaceNotebookRoutes = express();

spaceNotebookRoutes.get("/:id",authenticationMaintenanceAgent,async function(req,res){
    const id = req.params.id;
    if(!id)res.status(403).end();
    const spaceNoteBookController = await SpaceNoteBookController.getInstance();
    const spaceNoteBook = await spaceNoteBookController.getById(id);
    if(spaceNoteBook === null){
        res.status(404).end();
    }else{
        res.json(spaceNoteBook);
    }
});

spaceNotebookRoutes.get("",authenticationMaintenanceAgent,async function(req,res){

    const spaceNoteBookController = await SpaceNoteBookController.getInstance();
    const spaceNoteBook = await spaceNoteBookController.getAllSpaceNoteBook();
    if(spaceNoteBook === null){
        res.status(404).end();
    }else{
        res.json(spaceNoteBook);
    }
});

spaceNotebookRoutes.post("/new", authenticationMaintenanceAgent,async function(req, res) {
    const bestMonth = req.body.bestMonth;
    const timestamp = req.body.timestamp;

    if(timestamp === undefined || bestMonth === undefined){
        res.status(400).end();
        return;
    }
    const spaceNoteBookController = await SpaceNoteBookController.getInstance();
    const animal = await spaceNoteBookController.addSpaceNoteBook({
        bestMonth,
        timestamp
    });
    if(animal !== null) {
        res.status(201);
        res.json(animal);
    }else {
        res.status(404).end();
    }
});

spaceNotebookRoutes.put("/:id",authenticationMaintenanceAgent,async function(req,res){
    const bestMonth = req.body.bestMonth;
    const timestamp = req.body.timestamp;
    const id = req.params.id;

    if(timestamp === undefined || bestMonth === undefined || id === undefined){
        res.status(400).end();
        return;
    }
    const spaceNoteBookController = await SpaceNoteBookController.getInstance();
    const animal = await spaceNoteBookController.updateSpaceNoteBook(id,{
        bestMonth,
        timestamp
    });
    if(animal !== null) {
        res.status(201);
        res.json(animal);
    }else {
        res.status(404).end();
    }
});

spaceNotebookRoutes.delete("/:id",authenticationMaintenanceAgent, async function(req, res) {
    const id = req.params.id;
    if(!id)res.status(403).end();
    const spaceNoteBookController = await SpaceNoteBookController.getInstance();
    const spaceNoteBook = await spaceNoteBookController.removeSpaceNoteBookById(id);
    if(spaceNoteBook === null){
        res.status(404).end();
    }else{
        res.json(spaceNoteBook);
    }
});

export {
    spaceNotebookRoutes
};