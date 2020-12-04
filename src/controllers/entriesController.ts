import express from "express";

import authMiddleware from "../middlewares/authMiddleware";
import { validateEntry } from "../middlewares/validators";
import entriesService from "../services/entriesService";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {});

router.post("/", authMiddleware, validateEntry, async (req, res) => {
  const entryParams = req.body;

  const newEntry = {
    value: entryParams.value,
    description: entryParams.description,
    type: entryParams.type,
    userId: res.locals.user.id,
  };

  try {
    const entry = await entriesService.create(newEntry);
    res.status(200).send(entry);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
