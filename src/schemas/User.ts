import Joi from "joi";

export const UserCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  name: Joi.string().required(),
});

export const UserGetSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});
