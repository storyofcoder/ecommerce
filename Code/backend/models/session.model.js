const mongoose = require('mongoose');

/**
 * User Schema
 * @private
 */

const sessionSchema = new mongoose.Schema({
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
  userid: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  lastLogin: {
    type: String
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  roles: [ String ],
  otp: {
    code: Number,
    status: {
      type: String,
      default: 'NOT_USED'
    },
    lastTime: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true,
});

/**
 * @typedef admin
 */
module.exports = mongoose.model('Session', sessionSchema);
