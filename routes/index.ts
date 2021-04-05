import {Express} from "express";
import {animalRoutes} from "./animalRoutes";
import {userRoutes} from "./userRoutes";
import {typeRoutes} from "./typeRoutes";

export function buildRoutes(app: Express) {
    app.use("/animal", animalRoutes);
    app.use("/user",userRoutes);
    app.use("/type",typeRoutes);
}
