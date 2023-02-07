import * as Joi from 'joi';

export const ArticleSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.object()
    .keys({
      category_id: Joi.number().required(),
    })
    .required(),
  store: Joi.object()
    .keys({
      store_id: Joi.number().required(),
    })
    .required(),
  image_link: Joi.string().required(),
  description: Joi.string().required(),
});
