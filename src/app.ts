import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import usersController from "./controllers/usersController";
import entriesController from "./controllers/entriesController";

export const app = express();

app.use(cors());
app.use(express.json());
// Define Routes
app.use("/api/users", usersController);
app.use("/api/entries", entriesController);

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
