import {Express} from "express";
import {animalRoutes} from "./animalRoutes";
import {userRoutes} from "./userRoutes";
import {typeRoutes} from "./typeRoutes";
import {familyRoutes} from "./familyRoutes";
import {passRoutes} from "./passRoutes";
import {visitRoutes} from "./visitRoutes";
import {animal_notebookRoutes} from "./animal_notebookRoutes";
import {employeeRoutes} from "./employeeRoutes";
import {spaceRoutes} from "./spaceRoutes";
import {zooRoutes} from "./zooRoutes";

export function buildRoutes(app: Express) {
    app.use("/visit",visitRoutes)
    app.use("/user",userRoutes);
    app.use("/animal", animalRoutes);
    app.use("/type",typeRoutes);
    app.use("/pass",passRoutes);
    app.use("/family",familyRoutes);
    app.use("/animal_notebook",animal_notebookRoutes)
    app.use("/employee",employeeRoutes);
    app.use("/space",spaceRoutes);
    app.use("/zoo",zooRoutes);
}
