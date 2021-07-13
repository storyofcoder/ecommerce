const Joi = require('joi');

module.exports = {
  // POST /v1/user/register
  createUser: {
    body: {
      email: Joi.string().email().required().error(() => ''),
      password: Joi.string().required().min(6).max(128),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      userType: Joi.string().required()
    }
  },
  completeProfile: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      AddressLine1: Joi.string().required(),
      AddressLine2: Joi.string(),
      City: Joi.string().required(),
      Country: Joi.string().required(),
      BirthCountry: Joi.string().required(),
      State: Joi.string().required(),
      Gender: Joi.string().required(),
      DOB: Joi.string().required(),
      ZipCode: Joi.string().required(),
      Phone: Joi.number().required(),
      idType: Joi.string(),
      idNumber: Joi.string(),
      Nationality: Joi.string().required(),
      usesFor: Joi.string().required(),
      Occupation: Joi.string().required(),
      SourceOfFunds: Joi.string().required(),
    }
  },

  addWishlist:{
    body: {
      id: Joi.string().required()
    }
  },
  updateCart:{
    body:{
      id: Joi.string().required() ,
      quantity: Joi.number(),
      color: Joi.string(),
      size: Joi.string()
    }
  },
  addAddress:{
    body:{
      default: Joi.boolean(),
      update: Joi.boolean(),
      address: Joi.object()
    }
  },
  createOrder:{
    body:{
      payment_mode: Joi.string().required(),
    }
  },
  paymentCapture:{
    body:{
      orderid: Joi.string().required(),
      orderid: Joi.string().required(),
    }
  },
};

