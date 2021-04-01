import express from "express";

const spaceRoutes = express();

spaceRoutes.get("/Space:id",async function(req,res){
    res.send("get " + req.params.id);
});

spaceRoutes.post("/addSpace", async function(req, res) {
    res.send("post");
});

spaceRoutes.put("/modifySpace:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

spaceRoutes.delete("/delSpace" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    spaceRoutes
};