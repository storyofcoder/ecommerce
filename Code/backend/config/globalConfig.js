const path = require('path');
require('dotenv-safe').config({
  path: path.join(__dirname, '../.env')
});

const config = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  },
  sesSetting: {
    nodemailer: (accessToken) => {
      return {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: "munny231197@gmail.com",
          clientId: process.env.GOOGLE_CLIENTID,
          clientSecret: process.env.GOOGLE_SECRET,
          refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
          accessToken
        }
      }
    },
    fromEmail: 'E COM <munny231197@gmail.com>'
  },
  rateLimiter: {
    LoginEmailLimiter: process.env.NODE_ENV === 'production' ? 20 : 20
  },
  skipRateLimiterIP: process.env.NODE_ENV === 'production' ? [] : ['locahost', '127.0.0.1'],
  affiliateCode: {
    CHICOCRYPTO: true,
    CRYPTOADVENTURE: true
  },
  waitlist: {
    EXCHANGE_WAITLIST: true
  },
  UBSecKeys: {
    secret: process.env.UB_ENC_SECRET,
    salt: process.env.UB_ENC_SALT,
    iteration: 1000,
    keySize: 64,
    algorithm: 'aes-256-cbc',
    hmacSecret: process.env.UB_HMAC_SECRET
  },
  products: []
}

module.exports = { config }
