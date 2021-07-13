const path = require('path');
const { config: globalConfig } = require('./globalConfig')
const { errorlang } = require('./errorlang');
// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../.env')
});

module.exports = {
  globalConfig,
  errorlang,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'tempsecretcode',
  jwtExpirationInterval: process.env.NODE_ENV === 'production' ? '100h' : '100h',
  jwtSecretUB: process.env.JWT_SECRET_FOR_UPDATEBALANCE ? process.env.JWT_SECRET_FOR_UPDATEBALANCE : 'tempsecretcode',
  jwtExpirationUB: '40s',
  mongo: {
    uri: process.env.MONGO_URI,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    number: process.env.TWILIO_NUMBER,
    message: (OTP) => `${OTP} is your One Time Password (OTP) for the verification of your mobile verification on Ecom.`
  },
  pagination: {
    pl: 30,
    wishlist: 10
  },
  defaultSort: {
    pl: { "item_available": 1, "badges.amazon_сhoice": -1, "reviews.total_reviews": -1, "reviews.rating": -1 }
  },
  projection: {
    product_card: {
      "total_images": true,
      "title": true,
      "reviews": true,
      "price": true,
      "main_image": true,
      "images": true,
      "asin": true,
      "product_information": true,
      "_id": false
    },
    product: {
      "_id": false,
      "also_bought": false,
      "badges": false,
      "sponsored_products": false,
      "other_sellers": false,
      "delivery_message": false,
      "query": false,
      "categories": false,
      "url": false,
      "createdAt": false,
      "createdAt": false
    }
  },
  razorpay: {
    api: 'rzp_test_2Mt7NSHsMKAHgq',
    secret: 'f3yI3f2a9FPMb6FTgHV7JFTU',
    payment_capture: 0
  },
  order_payment_status:{
    pending: 'Pending',
    initiated: 'Initiated',
    complete: 'Complete',
    cancelled: 'Cancelled',
    rejected: 'Rejected'
  },
  order_status:{
    initiated: 'Initiated',
    delivery: 'Delivery',
    complete: 'Complete',
    cancelled: 'Cancelled',
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
