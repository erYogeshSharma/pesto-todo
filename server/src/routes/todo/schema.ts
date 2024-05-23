import Joi from "joi";

export default {
  create: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
  }),
  update: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.string(),
  }),
};
