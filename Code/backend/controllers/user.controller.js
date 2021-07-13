const Service = require('../services/user.service');

exports.getUser = async (req, res, next) => {
  try {
    const response = await Service.getUser(req.decoded.userid);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    const response = await Service.getWishlist(req.decoded.userid, req.query);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.addWishlist = async (req, res, next) => {
  try {
    const response = await Service.addWishlist(req.decoded.userid, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.deleteWishlist = async (req, res, next) => {
  try {
    const response = await Service.deleteWishlist(req.decoded.userid, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const response = await Service.getCart(req.decoded.userid);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const response = await Service.updateCart(req.decoded.userid, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.addAddress = async (req, res, next) => {
  try {
    const response = await Service.addAddress(req.decoded.userid, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const response = await Service.updateAddress(req.decoded.userid, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const response = await Service.createOrder(req.decoded.userid, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.paymentCapture = async (req, res, next) => {
  try {
    const response = await Service.paymentCapture(req.decoded.userid, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const response = await Service.cancelOrder(req.decoded.userid, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.orderHistory = async (req, res, next) => {
  try {
    const response = await Service.orderHistory(req.decoded.userid, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.recentViewed = async (req, res, next) => {
  try {
    const response = await Service.recentViewed(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};