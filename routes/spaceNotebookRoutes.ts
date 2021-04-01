import express from "express";

const spaceNotebookRoutes = express();

spaceNotebookRoutes.get("/SpaceNotebook:id",async function(req,res){
    res.send("get " + req.params.id);
});

spaceNotebookRoutes.post("/addSpaceNotebook", async function(req, res) {
    res.send("post");
});

spaceNotebookRoutes.put("/modifySpaceNotebook:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

spaceNotebookRoutes.delete("/delSpaceNotebook" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    spaceNotebookRoutes
};