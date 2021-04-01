import express from "express";

const animal_notebookRoutes = express();

animal_notebookRoutes.get("/animal_notebook:id",async function(req,res){
    res.send("get " + req.params.id);
});

animal_notebookRoutes.post("/addAnimal_notebook", async function(req, res) {
    res.send("post");
});

animal_notebookRoutes.put("/modifyAnimal_notebook:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

animal_notebookRoutes.delete("/delAnimal_notebook" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    animal_notebookRoutes
};