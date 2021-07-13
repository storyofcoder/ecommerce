const Joi = require('joi');

module.exports = {
  productList: {
    query: {
      id: Joi.string().required(),
      page: Joi.number(),
      limit: Joi.number().max(30)
    },
  },
  productSearch: {
    query: {
      q: Joi.string().required(),
      page: Joi.number(),
      limit: Joi.number().max(30)
    },
  },
  bestDeals: {
    query: {
      q: Joi.string(),
      page: Joi.number(),
      limit: Joi.number().max(30)
    },
  },
  product: {
    query: {
      id: Joi.string().required(),
    },
  },
};

