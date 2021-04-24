import express from "express";
import {ZooController} from "../controllers/zooController";
import {EmployeeController} from "../controllers/employeeController";
import {authenticationUser} from "../middlewares/authentification";

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

zooRoutes.post("/", async function(req, res) {
    const name = req.body.name;
    const isOpen = req.body.isOpen;

    if(name === undefined){
        res.status(400).end();
        return;
    }
    const zooController = await ZooController.getInstance();
    const zoo = await zooController.add({
            name,
            isOpen

    });
    if(zoo !== null) {
        res.status(201);
        res.json(zoo);
    }else {
        res.status(404).end();
    }

});

zooRoutes.put("/ouvrir:id",authenticationUser,async function(req,res){
    const id = req.params.id;
    const is_open = req.body.is_open;

    if(id === undefined || is_open === undefined || !is_open && is_open) {
        res.status(404).end();
    }

    const employeeController  = await EmployeeController.getInstance();
    const permissionToOpen = await employeeController.permissionToOpen();

    if (permissionToOpen){
        const zooController = await ZooController.getInstance();
        const openZoo = await zooController.update({
            id,
            is_open: is_open as boolean
        });
        if(openZoo!==null){
            res.status(201);
            res.json(openZoo);
        }else {
            res.status(404).end();
        }//TODO PTND E 403 QUAND ON OUVRE : token de l'admin :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjE4NTk4MTc1LCJleHAiOjE2MTg2ODQ1NzV9.833c6F0y8WQTZYvOL1s483RdZph-PppJLbO_igD9o9g
    }else{
        res.status(403).end();
    }
});

zooRoutes.put("/fermer:id",async function(req,res){
    const id = req.params.id;
        const zooController = await ZooController.getInstance();
        const openZoo = await zooController.update({
            id,
            is_open:false
        });
        if(openZoo!==null){
            res.status(201);
            res.json(openZoo);
        }else {
            res.status(404).end();
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