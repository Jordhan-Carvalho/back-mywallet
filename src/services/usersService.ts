import { User } from "../types/types";
import db from "../database/index";

const create = async (user: User) => {
  try {
    const resp = await db.query("SELECT * FROM users");
    return resp;
  } catch (error) {}
};

const isEmailUnique = async () => {};

export default { create };
