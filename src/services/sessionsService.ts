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

export default { create };
