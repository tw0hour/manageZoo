import {Express} from "express";
import {animalRoutes} from "./animalRoutes";
import {userRoutes} from "./userRoutes";

export function buildRoutes(app: Express) {
    app.use("/animal", animalRoutes);
    app.use("/user",userRoutes);
}
