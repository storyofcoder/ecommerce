const config = require('../config/vars');
const redis = require('../utils/redis');
const dashboardMenu = require('./data/topMenuList.json');
const dashboardCarousel = require('./data/dashboardBanner.json');
const Product = require('../models/product.model');
const { getSearchPorduct } = require('../scripts/loadProducts');

exports.getDashboardMenu = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = dashboardMenu.data;
      let result = {};
      result.data = response;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.getDashboardCarousel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = dashboardCarousel.data;
      let result = {};
      result.data = response;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.getProductsList = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const page = data.page || 0;
      const from = data.from || 'home';
      const key = (data.key || '').replace('.', '&');
      let key2 = (data.key2 || '').replace('.', '&');
      const limit = (data.limit && (data.limit < 30)) ? data.limit : config.pagination.pl;
      let sortMethods = {
        'Popularity': { 'score': -1 },
        'Price -- Low to High': { 'price.current_price': 1 },
        'Price -- High to Low': { 'price.current_price': -1 },
        'Newest First': { "_id": -1 },
        'Discount': { "price.savings_percent": -1 },
        'Rating': { "reviews.rating": -1 }
      };
      let query = {};
      let sort = sortMethods[data.sortBy || 'Discount'];
      if (from == 'related') {
        if (key) {
          query = { $or: [{ "product_information.brand": key }, { tags: { $all: key2 ? key2.split(',') : [] } }] };
        } else {
          query = { tags: { $all: key2 ? key2.split(',') : [] } };
        }
      } else if (from == 'tags') query = { tags: key };
      else query = { $text: { $search: key, $caseSensitive: true, $diacriticSensitive: true } };
      let count = await Product.find(query).count();
      let response = await Product
        .find(query, config.projection.product_card)
        .sort(sort)
        .skip(limit * page)
        .limit(limit);
      let result = {};
      result.data = response;
      result.count = count;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.getProductsSearch = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const page = data.page || 0;
      const limit = config.pagination.pl;
      let response = await Product
        .find({ $text: { $search: data.q } }, config.projection.product_card)
        .sort({ ...{ "price.savings_percent": -1 }, ...config.defaultSort.pl })
        .skip(limit * page)
        .limit(limit);
      let result = {};
      result.data = response;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.getBestDeals = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const page = data.page || 0;
      const limit = data.limit || config.pagination.pl;
      let response = await Product
        .find({}, config.projection.product_card)
        .sort({ "price.savings_percent": -1 })
        .skip(limit * page)
        .limit(limit);
      let result = {};
      result.data = response;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.getCategoriesOffer = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = dashboardCarousel.data;
      let result = {};
      result.data = response;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.getProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const asin = data.id;
      let response = await Product
        .findOne({ asin }, config.projection.product)

      let result = {};
      result.data = response;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.relatedProducts = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = [];
      if (data.brand) {
        response = await Product
          .find({ $or: [{ "product_information.brand": data.brand }, { tags: { $all: data.tags } }] }, config.projection.product_card).sort({ score: -1, "price.savings_percent": -1 }).limit(24);
      } else {
        response = await Product
          .find({ tags: { $all: data.tags } }, config.projection.product_card).sort({ score: -1, "price.savings_percent": -1 }).limit(18);
      }


      let result = {};
      result.data = response;
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}

exports.search = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = (data.query || '').toLowerCase();
      let products = getSearchPorduct();
      let search = [], tags = [], title = [], description = [], tagsHash = {};
      for (let i = 0; i < products.length; i++) {
        let counter = false;
        for (let j = 0; j < products[i].tags.length; j++) {
          if (products[i].tags[j].toLowerCase().includes(query) && !tagsHash[products[i].tags[j]]) {
            tags.push({
              value: products[i].tags[j],
              key: 'tags',
              main_image: products[i].main_image,
              brand: products[i].brand.replace(/&/g,"."),
              tags: products[i].tags.join(',').replace(/&/g,".")
            });
            counter = true;
            tagsHash[products[i].tags[j]] = true;
            continue
          }
        }
        if (!counter) {
          if (products[i].title.toLowerCase().includes(query)) {
            title.push({
              value: products[i].title,
              key: 'title',
              main_image: products[i].main_image,
              brand: products[i].brand.replace(/&/g,"."),
              tags: products[i].tags.join(',').replace(/&/g,".")
            });
            continue;
          };
          if (products[i].description.toLowerCase().includes(query)) {
            description.push({
              value: products[i].description,
              key: 'description',
              main_image: products[i].main_image,
              brand: products[i].brand.replace(/&/g,"."),
              tags: products[i].tags.join(',').replace(/&/g,".")
            });
          };
        }
      }
      search = [...tags, ...title, ...description];
      let result = {};
      result.data = search.slice(0, 10);
      result.status = "success";
      result.message = "Successfully";
      return resolve(result);
    } catch (error) {
      return reject(error)
    }
  })
}