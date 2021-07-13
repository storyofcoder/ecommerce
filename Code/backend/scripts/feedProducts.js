
const PromiseThrottle = require('promise-throttle');
const amazonScraper = require('amazon-buddy');
const Product = require('../models/product.model');
const base_config = {
    fetch_count_of_fetch_products: 300
}
let array = [];

setTimeout(() => {
    // init();
}, 5000);


async function init() {
    try {
        const categorys = ["men's clothing", "men shirt", "men pants", "young mens clothes", "women's clothes", "women's saree", "trending tshirts for girls", "trending pants for girls"];
        let arr = [];
        for (let i = 0; i < categorys.length; i++) {
            let result = await fetchData(categorys[i]);
            arr = [...arr, ...result];
            console.log(i + "completed");
        }

        await fetchProducts(arr);
        await Product.insertMany(array, { ordered: false });
        console.log('feed products script successfuly.');
        return true;
    } catch (error) {
        console.log('error in base script feeds orders', error);
    }

}

async function fetchData(category) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await amazonScraper.products({keyword: category, number:  base_config.fetch_count_of_fetch_products , country: 'IN' });
            let hash = {}, products_list = [];
            let count = 0;
            for (let i = 0; i < response.result.length; i++) {
                if (count > 300) break;
                if (!hash[response.result[i].asin]) {
                    hash[response.result[i].asin] = true;
                    count++;
                    products_list.push(response.result[i]);
                }
            }
            return resolve(products_list);
        } catch (error) {
            console.log('error in fetch products', error);
            return resolve([])
        }
    });
}
async function fetchProducts(products_list) {
    return new Promise(async (resolve, reject) => {
        try {
            const promiseThrottle = new PromiseThrottle({
                requestsPerSecond: 3,
                promiseImplementation: Promise
            });
            let promise = [];
            for (let i = 0; i < products_list.length; i++) {
                promise.push(promiseThrottle.add(fetchProduct.bind(this, products_list[i])));
            }
            if (promise.length) await Promise.all(promise);
            return resolve(true);
        } catch (error) {
            console.log('error in fetch products', error);
            return reject(error);
        }
    });
}

async function fetchProduct(prod) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await amazonScraper.asin({ asin: prod.asin, country: 'IN'  });
            const product = (response.result && response.result.length) ? response.result[0] : null;
            product['tags'] = product.categories.map(value => value.category);
            product['query'] = product['tags'].join(', ') + " / " + product['title'] + " / " + product['description'];
            product['score'] = prod.score;
            array.push(product);
            return resolve(true);
        } catch (e) {
            return resolve(false);
        }
    });

}