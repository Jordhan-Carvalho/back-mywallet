declare namespace Express {
  interface Request {
    user?: User;
    session?: Session;
  }
}
