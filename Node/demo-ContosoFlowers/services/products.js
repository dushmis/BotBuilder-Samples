var _ = require('lodash');
var Promise = require('bluebird');

const allCategories = _.times(5)
    .map((i) => ({
        name: 'Plan Type ' + (i + 1),
        imageUrl: 'http://youbroadband.in/img/logox100.png' + (i + 1) + '&w=640&h=330'
    }));

const allProducts = _.times(17)
    .map((i) => ({
        name: 'Plan ' + (i + 1),
        imageUrl: 'http://youbroadband.in/img/logox100.png' + (i + 1) + '&w=640&h=330',
        price: Math.floor(Math.random() * 100) + 10 + .99
    }));

const productsService = {
    // Categories
    getCategories: function(pageNumber, pageSize) {
        return pageItems(pageNumber, pageSize, allCategories);
    },

    // Get Single Category
    getCategory: function(categoryName) {
        var category = _.find(allCategories, ['name', categoryName]);
        return Promise.resolve(category);
    },

    // Products
    getProducts: function(categoryName, pageNumber, pageSize) {
        return pageItems(pageNumber, pageSize, allProducts);
    },

    // Get Single Product
    getProduct: function(productName) {
        var product = _.find(allProducts, ['name', productName]);
        return Promise.resolve(product);
    }
};

// helpers
function pageItems(pageNumber, pageSize, items) {
    var pageItems = _.take(_.drop(items, pageSize * (pageNumber - 1)), pageSize);
    var totalCount = items.length;
    return Promise.resolve({
        items: pageItems,
        totalCount: totalCount
    });
}

// export
module.exports = productsService;