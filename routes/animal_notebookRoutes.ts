import express from "express";
import {Animal_notebookController} from "../controllers/animal_notbookController";
import {authenticationGroomer} from "../middlewares/AuthVeto";

const animal_notebookRoutes = express();

animal_notebookRoutes.get("/:id",async function(req, res){
    const animal_notebookController = await Animal_notebookController.getInstance();
    const animal_notebook = await animal_notebookController.getById(req.params.id);
    if(animal_notebook === null){
        res.status(404).end();
    }else{
        res.json(animal_notebook);
    }
});

animal_notebookRoutes.get("/",async function(req, res){
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 1;
    const animal_notebookController = await Animal_notebookController.getInstance();
    const animal_notebookList = await animal_notebookController.getAll(limit, offset);

    if(animal_notebookList !== null)
    {
        res.json(animal_notebookList);
        res.status(201).end();
    }
    else
    {
        res.status(409).end();
    }
});

animal_notebookRoutes.post("/", async function(req, res) {
    const description = req.body.description;
    const health_status = req.body.health_status;


    if(description === undefined || health_status === undefined){
        res.status(400).end();
        return;
    }
    const animal_notebookController = await Animal_notebookController.getInstance();
    const animal_notebook = await animal_notebookController.add({
        description,
        health_status
    });
    if(animal_notebook !== null) {
        res.status(201);
        res.json(animal_notebook);
    }else {
        res.status(404).end();
    }

});

animal_notebookRoutes.put("/:id",async function(req, res){
    const id = req.params.id;
    const description = req.body.description;
    const health_status = req.body.health_status;
    const date = req.body.date;

    if(id === null || date === undefined || description === undefined || health_status === undefined)
    {
        res.status(400).end();
        return;
    }

    const animal_notebookController = await Animal_notebookController.getInstance();
    const animal_notebook = await animal_notebookController.update({
        id,
        description,
        health_status
    });
    if(animal_notebook === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(animal_notebook);
    }
});

animal_notebookRoutes.delete("/:id", async function(req, res) {
    const id = req.params.id;

    if(id === null)
    {
        res.status(400).end();
    }
    const animal_notebookController = await Animal_notebookController.getInstance();
    const animal_notebookRemove = await animal_notebookController.removeById(id);

    if(animal_notebookRemove)
    {
        res.status(204).end();
    }
    else
    {
        res.status(404).end();
    }

});

// animal_notebookRoutes.put("/addInfo/:idNoteBook", authenticationGroomer, async function(req, res){
//     const idNoteBook = req.params.idNoteBook;
//     const description = req.body.description;
//
//     if(idNoteBook === null)
//     {
//         res.status(400).end();
//     }
//
//     const animal_notebookController = await Animal_notebookController.getInstance();
//     const animal_notebook = await animal_notebookController.update({
//         id: idNoteBook,
//         description
//     });
//
//     if(animal_notebook === null)
//     {
//         res.status(404).end();
//     }
//     else
//     {
//         res.json(animal_notebook);
//     }
//
// });


export {
    animal_notebookRoutes
};