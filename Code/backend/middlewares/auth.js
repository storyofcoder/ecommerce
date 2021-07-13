const Session = require('../models/session.model');
let jwt = require('jsonwebtoken');
const config = require('../config/vars');

exports.authenticate = () => (req, res, next) => {
  if (!req.headers.authorization) {
    res.writeHead(400, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify({
      error: "You are not authorized to access this application",
      message: "A token is required as part of the header"
    }));
  } else {

    let token = req.headers.authorization;
    if (token.includes("Bearer")) token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, config.jwtSecret, async function (err, decoded) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Session Expired'
        });
      } else {
        if (req.decoded === undefined || req.decoded.length == 0) {
          req.decoded = {};
        }
        req.decoded.userid = decoded.userid;
        try {
          let session = await Session.findOne({
            userid: decoded.userid
          });
          if (!session || !session.isLoggedIn) return res.status(401).json({
            success: false,
            message: 'Session Expired'
          });
          return next();
        } catch (err) {
          return res.status(401).json({
            success: false,
            message: 'Session Expired'
          });
        }
      }
    });
  }
};

exports.authorize = (role) => async (req, res, next) => {
  //Get all the roles of userid
  if (req.decoded.roles && req.decoded.roles.length > 0 && req.decoded.roles.indexOf(role) != -1) {
    return next();
  } else {
    return res.status(401).json({
      status: "error",
      message: 'Authorization Error'
    });
  }
}


exports.signToken = (payload, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: '2m' }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};