import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import usersController from "./controllers/usersController";

const app = express();

app.use(cors());
app.use(express.json());
// Define Routes
app.use("/api/users", usersController);

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
