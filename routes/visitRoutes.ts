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
    const offset = parseInt(req.query.offset as string) || 0;
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

visitRoutes.get("/dailyVisitPerSpace/:idSpace", async function(req,res){
    const idSpace = req.params.idSpace;
    const visitController = await VisitController.getInstance();
    const nbVisit = await visitController.dailyVisitPerSpace(idSpace);

    if(idSpace === null || nbVisit === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(nbVisit);
        res.status(201).end();
    }
});

visitRoutes.post("/dailyVisitPerZoo", async function(req,res){
    const visitController = await VisitController.getInstance();
    const nbVisit = await visitController.dailyVisitPerZoo();

    if(nbVisit === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(nbVisit);
        res.status(201).end();
    }
});

visitRoutes.get("/visitPerSpaceAndDate/:idSpace", async function(req,res){
    const idSpace = req.params.idSpace;
    const date = req.body.date;
    const visitController = await VisitController.getInstance();
    const nbVisit = await visitController.visitPerSpaceAndDate(idSpace, date);

    if(idSpace === null || nbVisit === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(nbVisit);
        res.status(201).end();
    }
});

visitRoutes.post("/weeklyVisitPerZoo", async function(req,res){
    const visitController = await VisitController.getInstance();
    const nbVisit = await visitController.weeklyVisitPerZoo();

    if(nbVisit === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(nbVisit);
        res.status(201).end();
    }
});

visitRoutes.get("/weeklyVisitPerSpace/:idSpace", async function(req,res){
    const idSpace = req.params.idSpace;
    const visitController = await VisitController.getInstance();
    const nbVisit = await visitController.weeklyVisitPerSpace(idSpace);

    if(nbVisit === null)
    {
        res.status(404).end();
    }
    else
    {
        res.json(nbVisit);
        res.status(201).end();
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

visitRoutes.get("/canVisit/:idSpace",authenticationUser,async function(req,res){
    const idSpace = req.params.idSpace;
    if(!idSpace) res.status(403).end();

    const auth = req.headers["authorization"];
    const token = auth?.slice(7);
    const decoded = jwt.verify(token, JWT_KEY);
    const userController = await UserController.getInstance();
    const user = await userController.getById(decoded.id);

    if(user){
        const visitController = await VisitController.getInstance();
        const visit = await visitController.isValid(decoded.id,idSpace);
        if(!visit){
            res.status(404).end();
        }else{
            res.json(visit);
        }
    }
});


export {
    visitRoutes
};