const Product = require('../models/product.model');

let search = [];

exports.loadProducts = async () => {
    await init();
    return true;
}

async function init() {
    try {
        let products = await Product.find({}, { title: true, tags: true, description: true, product_information: true, main_image: true, score: true });
        let array = [];
        for (let i = 0; i < products.length; i++) {
            array.push({
                score: products[i].score,
                tags: products[i].tags,
                title: products[i].title,
                description: products[i].description,
                brand: products[i].product_information.brand,
                main_image: products[i].main_image
            })
        };
        search = array;
        console.log('feed products script successfuly.');
        return true;
    } catch (error) {
        console.log('error in base script feeds orders', error);
    }
}

exports.getSearchPorduct = () => {
    return search;
}