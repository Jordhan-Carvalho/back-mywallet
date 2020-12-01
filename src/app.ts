import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HI");
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
