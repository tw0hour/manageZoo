import express from "express";
import {TypeController} from "../controllers/TypeController";


const typeRoutes = express();

typeRoutes.get("/Type:id",async function(req,res){
    const typeList = await TypeController.getAll();
    res.json(typeList);
    //res.send("get " + req.params.id);
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