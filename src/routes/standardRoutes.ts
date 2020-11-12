import mongoose, { Document, Model } from "mongoose";
import { Router } from "express";

type BodyType<T> = {
    [P in keyof T]: string
}

export function standardRoutes<T, S extends Document & T>(
    router: Router,
    resourceName: string,
    schema: Model<S>,
    bodyMapper: (reqBody: BodyType<T>) => T
) {
    router.route("/").get((req, res) => {
        schema.find()
            .then((entry) => res.json(entry))
            .catch((err) => res.status(400).json("Error: " + err));
    });

    router.route("/").post((req, res) => {
        new schema(bodyMapper(req.body)).save()
            .then(() => res.json(`${resourceName} added!`))
            .catch((err) => res.status(400).json("Error: " + err));
    });

    router.route("/:id").get((req, res) => {
        schema.findById(req.params.id)
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json("Error: " + err));
    });

    router.route("/:id").delete((req, res) => {
        schema.findByIdAndDelete(req.params.id)
            .then(() => res.json(`${resourceName} deleted.`))
            .catch((err) => res.status(400).json("Error: " + err));
    });

    router.route("/:id").put((req, res) => {
        schema.findById(req.params.id)
            .then((entry: S) => {
                Object.entries(bodyMapper(req.body)).forEach(([key, value]) => {
                    // @ts-ignore
                    entry[key] = value;
                })
                entry.save()
                    .then(() => res.json(`${resourceName} updated!`))
                    .catch((err) => res.status(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
    });

}