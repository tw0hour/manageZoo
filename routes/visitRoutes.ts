import express from "express";
import {jwt, JWT_KEY, VisitController} from "../controllers/visitController";
import {authenticationAdmin, authenticationUser} from "../middlewares/authentification";
import {UserController} from "../controllers/userController";

const visitRoutes = express();

visitRoutes.get("/:id",authenticationAdmin,async function(req,res){
    const visitController = await VisitController.getInstance();
    const visit = await visitController.getById(req.params.id);
    if(visit === null){
        res.status(404).end();
    }else{
        res.json(visit);
    }
});

visitRoutes.get("/",authenticationAdmin,async function(req,res){
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

visitRoutes.post("/stats",authenticationAdmin, async function (req,res){
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

visitRoutes.delete("/:id",authenticationAdmin, async function(req, res) {
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

//check if the user can visit the space

visitRoutes.get("/:idSpace",authenticationUser,async function(req,res){
    const idSpace = req.params.isSpace;
    if(!idSpace) res.status(403).end();

    const auth = req.headers["authorization"];
    const token = auth?.slice(7);
    const decoded = jwt.verify(token, JWT_KEY);
    const userController = await UserController.getInstance();
    const user = await userController.getById(decoded.id);

    if(user){
        const visitController = await VisitController.getInstance();
        const visit = await visitController.isValid(user.idPass,idSpace);
        if(visit === null){
            res.status(404).end();
        }else{
            res.json(visit);
        }
    }
});


export {
    visitRoutes
};