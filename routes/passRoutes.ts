import express from "express";

const passRoutes = express();

passRoutes.get("/pass:id",async function(req,res){
    res.send("get " + req.params.id);
});

passRoutes.post("/addPass", async function(req, res) {
    res.send("post");
});

passRoutes.put("/modifyPass:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

passRoutes.delete("/delPass" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    passRoutes
};