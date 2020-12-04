import { Entry } from "../types/types";
import db from "../database/index";

const create = async (entry: Entry): Promise<Entry | undefined> => {
  const resp = await db.query(
    `INSERT INTO entries (value, description, type, "userId") VALUES ($1, $2, $3, $4) RETURNING *`,
    [entry.value, entry.description, entry.type, entry.userId]
  );
  return resp.rows[0];
};

export default { create };
