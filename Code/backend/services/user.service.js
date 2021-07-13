const User = require('../models/user.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const config = require('../config/vars');
const redis = require('../utils/redis');
const APIError = require('../utils/APIError');
const Razorpay = require('./payment/razorpay.service');
const uuidv4 = require('uuid/v4');

exports.getUser = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ userid });
      if (!user) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));
      const result = {};
      result.status = "success";
      result.message = "Successfully fetched user data";
      result.data = user;
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.getWishlist = (userid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ userid });
      const page = data.page || 0;
      const limit = config.pagination.wishlist;
      if (!user) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));
      const wishlist = user.wishlist;
      let wishlist_result = [];
      if (wishlist.length) {
        let promise = [];
        for (let i = 0; i < wishlist.length; i++) {
          promise.push(Product.findOne({ asin: wishlist[i] }, config.projection.product_card));
        }
        wishlist_result = await Promise.all(promise);
      }
      let result = {};
      result.data = wishlist_result;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.addWishlist = (userid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await Product.findOne({ asin: data.id }, { asin: true });
      if (!product) return reject(new APIError({ message: config.errorlang.PRODUCT_NOT_FOUND, status: 400 }));
      let user = await User.findOne({ userid });
      if (!user) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));

      const wishlist = user.wishlist;
      if (wishlist.find(element => element == data.id)) { return reject(new APIError({ message: config.errorlang.ALREADY_WISHLIST, status: 400 })); }
      wishlist.unshift(data.id);
      await User.findOneAndUpdate({ userid }, { wishlist });
      let result = {};
      result.data = {};
      result.status = "success";
      result.message = "Successfully Added";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.deleteWishlist = (userid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await Product.findOne({ asin: data.id }, { asin: true });
      if (!product) return reject(new APIError({ message: config.errorlang.PRODUCT_NOT_FOUND, status: 400 }));
      let user = await User.findOne({ userid });
      if (!user) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));

      const wishlist = user.wishlist;
      if (!wishlist.find(element => element == data.id)) { return reject(new APIError({ message: config.errorlang.WISHLIST_NOT_FOUND, status: 400 })); }

      wishlist.splice(wishlist.indexOf(data.id), 1);
      await User.findOneAndUpdate({ userid }, { wishlist });
      let result = {};
      result.data = {};
      result.status = "success";
      result.message = "Successfully Removed";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.getCart = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ userid });
      if (!user) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));
      const cart = user.cart || [];
      let cart_result = [];
      if (cart.length) {
        let promise = [];
        for (let i = 0; i < cart.length; i++) {
          promise.push(Product.findOne({ asin: cart[i].id }, config.projection.product_card));
        }
        cart_result = await Promise.all(promise);
        for (let i = 0; i < cart_result.length; i++) {
          let cart_data = { ...cart_result[i]._doc };
          cart_data.quantity = cart[i].quantity;
          cart_data.selected_size = cart[i].size;
          cart_result[i] = cart_data;
        }
      }
      let result = {};
      result.data = cart_result;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.updateCart = (userid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await Product.findOne({ asin: data.id }, { asin: true });
      if (!product) return reject(new APIError({ message: config.errorlang.PRODUCT_NOT_FOUND, status: 400 }));
      let user = await User.findOne({ userid });
      if (!user) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));

      const cart = user.cart || [];
      if (cart.find(element => element.id == data.id)) {
        if (!data.quantity) {
          cart.splice(cart.findIndex(x => x.id == data.id), 1);
        } else {
          cart[cart.findIndex(x => x.id == data.id)].quantity = data.quantity;
        }
      } else {
        cart.unshift({ id: data.id, quantity: data.quantity, size: data.size });
      }
      await User.findOneAndUpdate({ userid }, { cart });
      let result = {};
      result.data = {};
      result.status = "success";
      result.message = "Successfully Added";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.addAddress = (userid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ userid });
      if (!user) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));
      const address = user.delivery_address;
      if (data.default) {
        address.unshift(data.address);
      } else {
        address.splice(1, 0, data.address);
      }

      await User.findOneAndUpdate({ userid }, { delivery_address: address });
      let result = {};
      result.data = {};
      result.status = "success";
      result.message = "Successfully Removed";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.updateAddress = (userid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ userid });
      if (!user) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));
      const address = user.delivery_address;
      const index = data.index;
      if (data.update) {
        if (data.isDefault) {
          address.splice(index, 1);
          address.unshift(data, address);
        } else {
          address[index] = data.address;
        }
      } else {
        address.splice(index, 1);
      }
      await User.findOneAndUpdate({ userid }, { delivery_address: address });
      let result = {};
      result.data = {};
      result.status = "success";
      result.message = "Successfully Updated";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.createOrder = (userid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ userid });
      if (!user) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));
      const cart = user.cart || [];
      if (!cart.length) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));
      let cart_result = [], total_price = 0, total_saving = 0, currency = '';
      if (cart.length) {
        let promise = [];
        for (let i = 0; i < cart.length; i++) {
          promise.push(Product.findOne({ asin: cart[i].id }, { price: true }));
        }
        cart_result = await Promise.all(promise);
        for (let i = 0; i < cart_result.length; i++) {
          cart[i].price = cart_result[i].price;
          total_price += cart[i].quantity * cart_result[i].price.current_price;
          total_saving += cart[i].quantity * cart_result[i].price.savings_amount;
          if (!currency) currency = cart_result[i].price.currency;
          else if (cart_result[i].price.currency != currency) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));
        }
      }

      total_price += 5;

      let order = {
        orderid: uuidv4(),
        userid: userid,
        cart: cart,
        delivery_address: data.address || user.delivery_address && user.delivery_address.length ? user.delivery_address[0] : {}
      }

      if (data.payment_mode == 'ONLINE') {
        order['payment_initiate'] = await Razorpay.create(total_price, currency, order['orderid']);
        order['payment_status'] = config.order_payment_status.pending;
        order['status'] = config.order_status.initiated;
        order['payment_mode'] = 'ONLINE';
      } else {
        await User.findOneAndUpdate({ userid }, { cart: [] });
        order['payment_status'] = config.order_payment_status.pending;
        order['status'] = config.order_status.initiated;
        order['payment_mode'] = 'COD';
      }
      order['price'] = {
        total: total_price,
        currency: currency,
        saving: total_saving
      }

      const order_schema = new Order(order);
      await order_schema.save();
      let result = {};
      result.data = order;
      result.status = "success";
      result.message = "Successfully created";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.paymentCapture = (userid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await Order.findOne({ orderid: data.orderid, userid: userid });
      if (!order) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));
      let capture = await Razorpay.capture(order.price.total, order.price.currency, data.paymentid);
      order.payment_status = config.order_payment_status.complete;
      order.save();
      await User.findOneAndUpdate({ userid }, { cart: [] });
      let result = {};
      result.data = capture;
      result.status = "success";
      result.message = "Successfully created";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.cancelOrder = (userid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await Order.findOne({ orderid: data.orderid, userid: userid });
      if (!order) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));
      let capture = await Razorpay.refund(order.paymentid, order.price.amount, 'cancel');
      let result = {};
      result.data = capture;
      result.status = "success";
      result.message = "Successfully created";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.orderHistory = (userid, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ userid });
      if (!user) return reject(new APIError({ message: config.errorlang.NO_DATA_FOUND, status: 400 }));
      let orders = await Order.find({ userid }).sort({ createdAt: -1 });

      let cart_result = [];
      if (orders.length) {

        for (let i = 0; i < orders.length; i++) {
          let cart = orders[i].cart || [];
          let promise = [];
          for (let j = 0; j < cart.length; j++) {
            promise.push(Product.findOne({ asin: cart[j].id }, { main_image: true, price: true, product_information: true, reviews: true, title: true }));
          }
          cart_result = await Promise.all(promise);
          for (let j = 0; j < cart_result.length; j++) {
            orders[i].cart[j].product = cart_result[j];
          }
        }
      }
      let result = {};
      result.data = orders;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.recentViewed = ( data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let array = data.items || [];
      let promise = [];
      for (let j = 0; j < array.length; j++) {
        promise.push(Product.findOne({ asin: array[j] }, config.projection.product_card));
      }
      let cart_result = await Promise.all(promise);
      let result = {};
      result.data = cart_result;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}