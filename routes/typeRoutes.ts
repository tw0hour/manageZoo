import express from "express";

const typeRoutes = express();

typeRoutes.get("/Type:id",async function(req,res){
    res.send("get " + req.params.id);
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