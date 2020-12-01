import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import usersController from "./controllers/usersController";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
// Define Routes
app.use("/api/users", usersController);

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
