const mongoose = require('mongoose');

/**
 * User Schema
 * @private
 */

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    orderid: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    cart: {
        type: Array,
        required: true
    },
    payment_initiate: {
        type: Object,
    },
    payment_status: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    payment_mode: {
        type: String,
        required: true
    },
    delivery_address: {
        type: Object,
        required: true
    },
    price: {
        type: Object,
        required: true
    },
    delivery_address: {
        type: Object,
        required: true
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
module.exports = mongoose.model('Order', userSchema);
