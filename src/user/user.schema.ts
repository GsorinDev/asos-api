import * as Joi from 'joi';

export const UserSchema = Joi.object().keys({
  mail: Joi.string().required(),
  pseudo: Joi.string().required(),
  password: Joi.string().required(),
});
