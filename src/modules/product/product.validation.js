import joi from "joi";

export const createProduct = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();
