const mongoose = require('mongoose');

/**
 * User Schema
 * @private
 */

const userSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  address: {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      index: true,
      trim: true,
      lowercase: true,
    },
    number: {
      type: String,
      index: true,
      trim: true,
      lowercase: true,
    },
  },
  firstName: {
    type: String,
    maxlength: 128,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 128,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true
  },
  wishlist: {
    type: Array,
    default: []
  },
  cart: {
    type: Array,
    default: []
  },
  delivery_address: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
});

/**
 * @typedef admin
 */
module.exports = mongoose.model('User', userSchema);
