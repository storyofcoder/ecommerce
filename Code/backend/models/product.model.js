const mongoose = require('mongoose');

/**
 * User Schema
 * @private
 */

const userSchema = new mongoose.Schema({
    "also_bought" :  {
        type: Array,
        default: []
    },
    "badges" : {
        type: Object,
        required: false
    },
    "bestsellers_rank" :  {
        type: Array,
        default: []
    },
    "total_videos" : {
        type: Number
    },
    "total_images" : {
        type: Number
    },
    "title" : {
        type: String,
        required: false
    },
    "tags" :  {
        type: Array,
        default: []
    },
    "sponsored_products" :  {
        type: Array,
        default: []
    },
    "reviews" : {
        type: Object
    },
    "query" : {
        type: String,
        required: false
    },
    "product_information" : {
        type: Object,
        required: false
    },
    "price" : {
        type: Object,
        required: false
    },
    "other_sellers" : {
        type: Array,
        default: []
    },
    "main_image" : {
        type: String,
        required: false
    },
    "item_available" : {
        type: Boolean,
        default: true
    },
    "description" : {
        type: String,
        required: false
    },
    "feature_bullets" :  {
        type: Array,
        default: []
    },
    "images" :  {
        type: Array,
        default: []
    },
    "delivery_message" : {
        type: String,
        required: false
    },
    "categories" :  {
        type: Array,
        default: []
    },
    "url" : {
        type: String,
        required: false
    },
    "status" : {
        type: Boolean,
        default: true
    },
    "asin" : {
        type: String,
        required: true
    },
    "score" : {
        type: String,
    },
    "createdAt": {
        type: Date,
        default: Date.now
    },
    "updatedAt": {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true,
});

/**
 * @typedef admin
 */
module.exports = mongoose.model('Product', userSchema);
