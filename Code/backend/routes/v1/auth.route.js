const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const { authenticate } = require('../../middlewares/auth');
const { OTP, confirmOTP } = require('../../validations/auth.validation');
const router = express.Router();
const cors = require('cors');
const { config } = require('../../config/globalConfig');
const rateLimit = require('express-rate-limit');

const OTPLimiter = new rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: config.rateLimiter.LoginEmailLimiter,
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  message: JSON.stringify({ message: "Too many login from this email / number, please try after sometime", status: "error" }),
  keyGenerator: (req) => {
    return req.body.email;
  }
});

router
  .route('/')
  .get(authenticate(), controller.auth);

router
  .route('/:id')
  .get( validate(OTP), OTPLimiter, controller.getAuthCode);

router
  .route('/confirm-auth')
  .post(validate(confirmOTP), OTPLimiter, controller.confirmAuthCode);

router
  .route('/logout')
  .post(authenticate(), controller.logout);

module.exports = router;
