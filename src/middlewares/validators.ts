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

const userSignInSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

const entrySchema = Joi.object({
  value: Joi.number().required(),
  description: Joi.string().min(2).max(300).required(),
  type: Joi.string().valid("entrada", "saida").required(),
});

const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  if (userSchema.validate(req.body).error)
    return res.status(422).send(userSchema.validate(req.body).error?.message);

  next();
};

const validateSignin = (req: Request, res: Response, next: NextFunction) => {
  if (userSignInSchema.validate(req.body).error)
    return res
      .status(400)
      .send(userSignInSchema.validate(req.body).error?.message);

  next();
};

const validateEntry = (req: Request, res: Response, next: NextFunction) => {
  if (entrySchema.validate(req.body).error)
    return res
      .status(400)
      .send(userSignInSchema.validate(req.body).error?.message);

  next();
};

export { validateSignup, validateSignin, validateEntry };
