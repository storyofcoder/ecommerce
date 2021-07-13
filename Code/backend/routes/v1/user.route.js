const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');
const { authenticate } = require('../../middlewares/auth');
const { addWishlist, updateCart, addAddress, createOrder, paymentCapture } = require('../../validations/user.validation');
const router = express.Router();
const { config } = require('../../config/globalConfig');

router
  .route('/')
  .get(authenticate(), controller.getUser);

router
  .route('/get-wishlist')
  .get(authenticate(), controller.getWishlist);

router
  .route('/add-wishlist')
  .post(authenticate(), validate(addWishlist), controller.addWishlist);

router
  .route('/delete-wishlist')
  .post(authenticate(), validate(addWishlist), controller.deleteWishlist);

router
  .route('/get-cart')
  .get(authenticate(), controller.getCart);

router
  .route('/update-cart')
  .post(authenticate(), controller.updateCart);

router
  .route('/add-address')
  .post(authenticate(), validate(addAddress), controller.addAddress);

router
  .route('/update-address')
  .post(authenticate(), validate(addAddress), controller.updateAddress);

router
  .route('/create-order')
  .post(authenticate(), validate(createOrder), controller.createOrder);

router
  .route('/payment-capture')
  .post(authenticate(), validate(paymentCapture), controller.paymentCapture);

router
  .route('/cancel-order')
  .post(authenticate(), controller.cancelOrder);

router
  .route('/order-history')
  .post(authenticate(), controller.orderHistory);

router
  .route('/recent-viewed')
  .post(controller.recentViewed);

module.exports = router;
