import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const userRegex = /[a-zA-Z0-9.]+/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,10}$/;

const userSchema = Joi.object({
  name: Joi.string().pattern(userRegex).min(2).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().pattern(passwordRegex).required(),
  confirmPassword: Joi.ref("password"),
});

const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  if (userSchema.validate(req.body).error)
    return res.status(422).send(userSchema.validate(req.body).error?.message);

  next();
};

export { validateSignup };
