import express from "express";

const userRoutes = express();

userRoutes.get("/User:id",async function(req,res){
    res.send("get " + req.params.id);
});

userRoutes.post("/addUser", async function(req, res) {
    res.send("post");
});

userRoutes.put("/modifyUser:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

userRoutes.delete("/delUser" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    userRoutes
};