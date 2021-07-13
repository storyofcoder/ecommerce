const Service = require('../services/auth.service');

exports.getAuthCode = async (req, res, next) => {
  try {
    const response = await Service.getAuthCode(req.params);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
}

exports.confirmAuthCode = async (req, res, next) => {
  try {
    const response = await Service.confirmAuthCode(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.auth = async (req, res, next) => {
  try {
    const response = await Service.auth(req.decoded);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const response = await Service.logout(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};