import { v4 } from "uuid";

import db from "../database/index";

const create = async (userId: number): Promise<string> => {
  const token = v4();
  await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [
    userId,
    token,
  ]);
  return token;
};

const deleteSessions = async (userId: number) => {
  await db.query(`DELETE FROM sessions WHERE "userId" = $1`, [userId]);
};

const findByToken = async (token: string) => {
  const resp = await db.query("SELECT * FROM sessions WHERE token = $1", [
    token,
  ]);
  return resp.rows[0];
};

export default { create, deleteSessions, findByToken };
