import express from "express";

import usersService from "../services/usersService";
import sessionsService from "../services/sessionsService";
import { User } from "../types/types";
import { validateSignin, validateSignup } from "../middlewares/validators";

const router = express.Router();

router.post("/sign-up", validateSignup, async (req, res) => {
  const userParams: User = req.body;

  try {
    const createdUser = await usersService.create(userParams);
    res.send(createdUser).status(201);
  } catch (e) {
    res.send(e.message).status(409);
  }
});

router.post("/sign-in", validateSignin, async (req, res) => {
  const userParams: User = req.body;

  try {
    const user = await usersService.findByEmail(userParams);

    if (!user) return res.sendStatus(401);
    const token = await sessionsService.create(user.id as number);

    res.send({ ...user, token }).status(200);
  } catch (e) {
    console.log("Catch", e);
  }
});

export default router;
