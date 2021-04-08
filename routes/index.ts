import {Express} from "express";
import {animalRoutes} from "./animalRoutes";
import {userRoutes} from "./userRoutes";
import {typeRoutes} from "./typeRoutes";

export function buildRoutes(app: Express) {

    app.use("/user",userRoutes);
    app.use("/animal", animalRoutes);
    app.use("/type",typeRoutes);
}
