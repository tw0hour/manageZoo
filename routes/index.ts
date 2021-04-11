import {Express} from "express";
import {animalRoutes} from "./animalRoutes";
import {userRoutes} from "./userRoutes";
import {typeRoutes} from "./typeRoutes";
import {visitRoutes} from "./visitRoutes";
import {animal_notebookRoutes} from "./animal_notebookRoutes";
import {spaceRoutes} from "./spaceRoutes";

export function buildRoutes(app: Express) {
    app.use("/visit",visitRoutes)
    app.use("/user",userRoutes);
    app.use("/animal", animalRoutes);
    app.use("/type",typeRoutes);
    app.use("/animal_notebook",animal_notebookRoutes);
    app.use("/space",spaceRoutes);
}
