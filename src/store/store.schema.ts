import * as Joi from 'joi';

export const StoreSchema = Joi.object().keys({
  name: Joi.string().required(),
});
