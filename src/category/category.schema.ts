import * as Joi from 'joi';

export const CategorySchema = Joi.object().keys({
  libelle: Joi.string().required(),
});
