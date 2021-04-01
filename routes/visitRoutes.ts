import express from "express";

const visitRoutes = express();

visitRoutes.get("/Visit:id",async function(req,res){
    res.send("get " + req.params.id);
});

visitRoutes.post("/addVisit", async function(req, res) {
    res.send("post");
});

visitRoutes.put("/modifyVisit:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

visitRoutes.delete("/delVisit" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    visitRoutes
};