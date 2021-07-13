const Service = require('../services/public.service');

exports.getDashboardMenu = async (req, res, next) => {
  try {
    const response = await Service.getDashboardMenu();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.getDashboardCarousel = async (req, res, next) => {
  try {
    const response = await Service.getDashboardCarousel();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.getProductsList = async (req, res, next) => {
  try {
    const response = await Service.getProductsList(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.getProductsSearch = async (req, res, next) => {
  try {
    const response = await Service.getProductsSearch(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.getBestDeals = async (req, res, next) => {
  try {
    const response = await Service.getBestDeals(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.getCategoriesOffer = async (req, res, next) => {
  try {
    const response = await Service.getCategoriesOffer();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const response = await Service.getProduct(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.relatedProducts = async (req, res, next) => {
  try {
    const response = await Service.relatedProducts(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const response = await Service.search(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};