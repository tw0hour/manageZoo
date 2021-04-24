import express from "express";
import {FamilyController} from "../controllers/familyController";
import {authenticationAdmin, authenticationEmployees} from "../middlewares/authentification";

const familyRoutes = express();


familyRoutes.get("/getById:id",authenticationEmployees, async function(req,res){
    const familyController = await FamilyController.getInstance();
    const family = await familyController.getById(req.params.id);
    if(family === null){
        res.status(404).end();
    }else{
        res.json(family);
    }
});

familyRoutes.get("/getAllFamily",authenticationEmployees, async function(req,res){
    const limit = parseInt(req.query.limit as string) | 10;
    const offset = parseInt(req.query.offset as string) | 1;
    const familyController = await FamilyController.getInstance();
    const familyList = await familyController.getAllFamily(limit, offset);

    if(familyList !== null)
    {
        res.json(familyList);
        res.status(201).end();
    }
    else
    {
        res.status(409).end();
    }
});

familyRoutes.post("/add",authenticationAdmin, async function(req, res) {
    const name = req.body.name;

    if(name === undefined){
        res.status(400).end();
        return;
    }
    const familyController = await FamilyController.getInstance();
    const family = await familyController.addFamily({
        name
    });
    if(family !== null) {
        res.status(201);
        res.json(family);
    }else {
        res.status(404).end();
    }

});

familyRoutes.put("/modify:id",authenticationAdmin,async function(req,res){
    const id = req.params.id;
    const name = req.body.name;

    if(id === null)
    {
        res.status(400).end();
        return;
    }

    const familyController = await FamilyController.getInstance();
    const family = await familyController.updateFamily({
        id,
        name
    });
    if(family === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(family);
    }
});

familyRoutes.delete("/removeById:id",authenticationAdmin, async function(req, res) {
    const id = req.params.id;

    if(id === null)
    {
        res.status(400).end();
    }
    const familyController = await FamilyController.getInstance();
    const familyRemove = await familyController.removeFamilyById(id);

    if(familyRemove)
    {
        res.status(204).end();
    }
    else
    {
        res.status(404).end();
    }

});

export {
    familyRoutes
};