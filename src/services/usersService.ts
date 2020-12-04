import bcrypt, { compareSync } from "bcrypt";

import { User } from "../types/types";
import db from "../database/index";

const create = async (user: User): Promise<User> => {
  const { name, email, password } = user;

  const hashedPass = bcrypt.hashSync(password, 10);
  const resp = await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPass]
  );
  const newUser = resp.rows[0];

  return newUser;
};

const findByEmail = async (user: User): Promise<User | undefined> => {
  const { email, password } = user;

  const resp = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (resp.rowCount === 0) return undefined;
  const foundUser = resp.rows[0];
  const isPassCorrect = compareSync(password, foundUser.password);

  if (!isPassCorrect) return undefined;
  return foundUser;
};

const findById = async (userId: number) => {
  const resp = await db.query('SELECT * FROM users WHERE "userId" = $1', [
    userId,
  ]);
  return resp.rows[0];
};

export default { create, findByEmail, findById };
