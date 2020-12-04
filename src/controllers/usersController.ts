import express from "express";

import usersService from "../services/usersService";
import sessionsService from "../services/sessionsService";
import { User } from "../types/types";
import { validateSignin, validateSignup } from "../middlewares/validators";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/sign-up", validateSignup, async (req, res) => {
  const userParams: User = req.body;

  try {
    const createdUser = await usersService.create(userParams);
    res.status(201).send(createdUser);
  } catch (e) {
    res.status(409).send(e.message);
  }
});

router.post("/sign-in", validateSignin, async (req, res) => {
  const userParams: User = req.body;

  try {
    const user = await usersService.findByEmail(userParams);

    if (!user) return res.sendStatus(401);
    const token = await sessionsService.create(user.id as number);

    res.status(200).send({ ...user, token });
  } catch (e) {
    console.log("Catch", e);
  }
});

router.post("/logout", authMiddleware, async (req, res) => {
  try {
    await sessionsService.deleteSessions(res.locals.user.id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send("Not able to delete sessions");
  }
});

export default router;
