import express from "express";

const employeeRoutes = express();

employeeRoutes.get("/employee:id",async function(req,res){
    res.send("get " + req.params.id);
});

employeeRoutes.post("/addEmployee", async function(req, res) {
        res.send("post");
});

employeeRoutes.put("/modifyEmployee:id",async function(req,res){
    res.send("modifier" + req.params.id);
});

employeeRoutes.delete("/delEmployee" /*, authMiddleware*/, async function(req, res) {
    res.send("sup la session");
});

export {
    employeeRoutes
};