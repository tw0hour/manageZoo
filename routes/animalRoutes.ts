import express from "express";

const animalRoutes = express();

animalRoutes.get("/AnimalRoutes:id",async function(req,res){
    res.send("get " + req.params.id);
});

animalRoutes.post("/addAnimalRoutes", async function(req, res) {
    res.send("post");
});

animalRoutes.put("/modifyAnimalRoutes:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

animalRoutes.delete("/delAnimalRoutes" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    animalRoutes
};