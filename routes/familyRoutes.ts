import express from "express";

const familyRoutes = express();


familyRoutes.get("/family:id",async function(req,res){
    res.send("get " + req.params.id);
});

familyRoutes.post("/addFamily",
    async function(req, res) {
        res.send("post");
});

familyRoutes.put("/modifyFamily:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

familyRoutes.delete("/delFamily" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    familyRoutes
};