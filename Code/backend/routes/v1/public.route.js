const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const controller = require('../../controllers/public.controller');
const { productList, productSearch, bestDeals, product } = require('../../validations/public.validations');

router
  .route('/dashboard-menu')
  .get(controller.getDashboardMenu);

router
  .route('/dashboard-carousel')
  .get(controller.getDashboardCarousel);

router
  .route('/best-deals')
  .get(validate(bestDeals), controller.getBestDeals);

router
  .route('/product-list')
  .post(controller.getProductsList);

router
  .route('/ps')
  .get(validate(productSearch), controller.getProductsSearch);

router
  .route('/get-categories-offer')
  .get(controller.getCategoriesOffer);

router
  .route('/product')
  .get(validate(product), controller.getProduct);

router
  .route('/related-products')
  .post(controller.relatedProducts);

router
  .route('/search')
  .get(controller.search);

module.exports = router;
