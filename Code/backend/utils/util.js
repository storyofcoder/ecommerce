const jwt = require('jsonwebtoken');
const config = require('../config/vars');
const { secret, salt, iteration, keySize, algorithm, hmacSecret } = config.globalConfig.UBSecKeys;
const fs = require('fs');
const crypto = require('crypto');

const symmetricEncryption = (data) => {
  return new Promise((resolve, reject) => {
    try {
      let key = crypto.pbkdf2Sync(secret, salt, iteration, keySize, 'sha1').toString('hex');
      let iv = crypto.pbkdf2Sync(secret, salt, iteration, keySize, 'sha1').toString('hex');
      const cipher = crypto.createCipheriv(algorithm, key.slice(0, 32), iv.slice(0, 16));
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      resolve(encrypted);
    } catch (e) {
      reject(new Error(e));
    }
  });
};

const hashWithHmac = (data) => {
  const dataToHash = JSON.stringify(data);
  const hash = crypto.createHmac('sha256', hmacSecret)
    .update(dataToHash)
    .digest('hex');
  return hash;
};

exports.createJWT = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, config.jwtSecret, { expiresIn: config.jwtExpirationInterval }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}

exports.storeEmail = async (req, res, next) => {
  if (!req.body.email) return next();
  let email = req.body.email;
  await fs.appendFileSync('./tmp/log.txt', `${email},`);
  return next();
}
