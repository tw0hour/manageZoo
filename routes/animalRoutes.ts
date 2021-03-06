import express from "express";
import {AnimalController} from "../controllers/animalController";
import {authenticationAdmin, authenticationEmployees} from "../middlewares/authentification";


const animalRoutes = express();

animalRoutes.get("/getById:id",async function(req,res){
    const id = req.params.id;
    if(!id) res.status(403).end();
    const animalController = await AnimalController.getInstance();
    const animal = await animalController.getById(id);
    if(animal === null){
        res.status(404).end();
    }else{
        res.json(animal);
    }
});

animalRoutes.get("/getAll",async function(req,res){
    const limit = parseInt(req.query.limit as string) | 10;
    const offset = parseInt(req.query.offset as string) | 1;
    const animalController = await AnimalController.getInstance();
    const animalList = await animalController.getAllAnimal(limit, offset);

    if(animalList !== null)
    {
        res.json(animalList);
        res.status(201).end();
    }
    else
    {
        res.status(409).end();
    }
});

animalRoutes.post("/add", authenticationAdmin,async function(req, res) {
    const species = req.body.species;
    const name = req.body.name;

    if(species === undefined || name === undefined){
        res.status(400).end();
        return;
    }
    const animalController = await AnimalController.getInstance();
    const animal = await animalController.addAnimal({
        species,
        name
    });
    if(animal !== null) {
        res.status(201);
        res.json(animal);
    }else {
        res.status(404).end();
    }
});

animalRoutes.put("/modify:id",authenticationAdmin,async function(req,res){
    const id = req.params.id;
    const species = req.body.species;
    const name = req.body.name;

    if(id === null)
    {
        res.status(400).end();
        return;
    }

    const animalController = await AnimalController.getInstance();
    const animal = await animalController.updateAnimal({
        id,
        species,
        name
    });
    if(animal === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(animal);
    }
});

animalRoutes.delete("/removeAnimalById:id",authenticationAdmin, async function(req, res) {
    const id = req.params.id;

    if(id === null)
    {
        res.status(400).end();
    }
    const animalController = await AnimalController.getInstance();
    const animalRemove = await animalController.removeAnimalById(id);

    if(animalRemove)
    {
        res.status(204).end();
    }
    else
    {
        res.status(404).end();
    }

});

export {
    animalRoutes
};