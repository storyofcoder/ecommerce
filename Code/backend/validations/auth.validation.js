const Joi = require('joi');

module.exports = {
  OTP:{
    params: {
      id: Joi.string().required()
    },
  },
  confirmOTP:{
    body: {
      id: Joi.string().required(),
      otp: Joi.number().required().min(0000).max(9999),
    },
  }
};

