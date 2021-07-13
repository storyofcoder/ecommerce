const config = require('../../config/vars');
const Razorpay = require('razorpay');

const razorInstance = new Razorpay({
  key_id: config.razorpay.api,
  key_secret: config.razorpay.secret,
})

exports.create = (amount, currency, receipt) => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        amount: amount * 100,
        currency: currency,
        receipt: receipt,
        payment_capture: config.razorpay.payment_capture
      };
      razorInstance.orders.create(options, (error, order) => {
        if (error) { return reject(error); }
        return resolve(order)
      });
    }
    catch (error) {
      return reject(error);
    }
  })
}

exports.capture = (amount, currency, paymentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      razorInstance.payments.capture(paymentId, amount * 100, currency, (err, payment) => {
        if (err) { return reject(err); }
        return resolve(payment);
      })
    }
    catch (error) {
      return reject(error);
    }
  })
}

exports.refund = (payment_id, amount, note) => {
  return new Promise(async (resolve, reject) => {
    try {
      razorInstance.payments.refund(payment_id, { amount: amount * 100, note }, (err, payment) => {
        if (err) { return reject(err); }
        return resolve(payment);
      });
    }
    catch (error) {
      return reject(error);
    }
  })
}