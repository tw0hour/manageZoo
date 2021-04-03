import express from "express";

const animalRoutes = express();

animalRoutes.get("/:id",async function(req,res){
    res.send("get " + req.params.id);
});

animalRoutes.post("/add", async function(req, res) {
    res.send("post");
});

animalRoutes.put("/modify:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

animalRoutes.delete("/del" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    animalRoutes
};