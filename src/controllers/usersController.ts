import express from "express";
import db from "../database/index";

import usersService from "../services/usersService";
import { User } from "../types/types";
import { validateSignup } from "../middlewares/validators";

const router = express.Router();

router.post("/sign-up", validateSignup, async (req, res) => {
  const userParams: User = req.body;
  console.log(userParams);
  try {
    const resp = await db.query("SELECT * FROM users;");
    console.log(resp);
  } catch (error) {
    console.log(error);
  }

  res.send("WORKING user route");
});

export default router;
