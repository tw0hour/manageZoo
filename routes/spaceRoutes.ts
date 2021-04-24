import express from "express";
import {SpaceController} from "../controllers/spaceControllers";
import {authenticationAdmin} from "../middlewares/authentification";

const spaceRoutes = express();

spaceRoutes.get("/:id",async function(req,res){
    const spaceController = await SpaceController.getInstance();
    const space = await spaceController.getById(req.params.id);
    if(space === null){
        res.status(404).end();
    }else{
        res.json(space);
    }
});

spaceRoutes.get("/",async function(req,res){
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 1;
    const spaceController = await SpaceController.getInstance();
    const spaceList = await spaceController.getAll(limit, offset);

    if(spaceList !== null)
    {
        res.json(spaceList);
        res.status(201).end();
    }
    else
    {
        res.status(409).end();
    }
});

spaceRoutes.post("/",authenticationAdmin, async function(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const capacity = req.body.capacity;
    const duration = req.body.duration;
    const hour_open = req.body.hour_open;
    const handicapped_access = req.body.handicapped_access;
    const status = req.body.status;
    if(name === undefined || description === undefined || image === undefined || capacity === undefined || duration === undefined || hour_open=== undefined || handicapped_access=== undefined){
        res.status(400).end();
        return;
    }
    const spaceController = await SpaceController.getInstance();
    const space = await spaceController.add({
        name,
        description,
        image,
        capacity,
        duration,
        hour_open,
        handicapped_access,
        status
    });
    if(space !== null) {
        res.status(201);
        res.json(space);
    }else {
        res.status(404).end();
    }

});

spaceRoutes.put("/maintenance:id",authenticationAdmin, async function(req:express.Request, res:express.Response){
    const id = req.params.id;
    const status = req.body.status;
    console.log(id);
    if(status !== true && status !== false) {
        res.status(400).end();
        return;
    }

    const spaceController = await SpaceController.getInstance();
    const visit = await spaceController.update({
        id,
        status
    });
    if(visit === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(visit);
    }

});

spaceRoutes.put("/:id",authenticationAdmin,async function(req,res){
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const capacity = req.body.capacity;
    const duration = req.body.duration;
    const hour_open = req.body.hour_open;
    const handicapped_access = req.body.handicapped_access;

    if(id === null)
    {
        res.status(400).end();
        return;
    }

    const spaceController = await SpaceController.getInstance();
    const visit = await spaceController.update({
        id,
        name,
        description,
        image,
        capacity,
        duration,
        hour_open,
        handicapped_access
    });
    if(visit === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(visit);
    }
});

spaceRoutes.delete("/:id",authenticationAdmin, async function(req, res) {
    const id = req.params.id;

    if(id === null)
    {
        res.status(400).end();
    }
    const spaceController = await SpaceController.getInstance();
    const spaceRemove = await spaceController.removeById(id);

    if(spaceRemove)
    {
        res.status(204).end();
    }
    else
    {
        res.status(404).end();
    }

});

export {
    spaceRoutes
};