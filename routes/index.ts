import {Express} from "express";
import {animalRoutes} from "./animalRoutes";
import {userRoutes} from "./userRoutes";
import {typeRoutes} from "./typeRoutes";
import {familyRoutes} from "./familyRoutes";
import {passRoutes} from "./passRoutes";

export function buildRoutes(app: Express) {

    app.use("/user",userRoutes);
    app.use("/animal", animalRoutes);
    app.use("/type",typeRoutes);
    app.use("/pass",passRoutes);
    app.use("/family",familyRoutes);
}
