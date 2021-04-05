import express from "express";
import {TypeController} from "../controllers/TypeController";


const typeRoutes = express();

typeRoutes.get("/",async function(req,res){

    const typeController = await TypeController.getInstance();
    const typeList = await typeController.getAll();
    res.json(typeList);
    //todo prendre en compte la limit et l'offset
});

typeRoutes.post("/addType", async function(req, res) {
    res.send("post");
});

typeRoutes.put("/modifyType:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

typeRoutes.delete("/delType" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    typeRoutes
};