const clothModel = require('../models/clothModel');
const clothService = require('../models/clothService')

const { ObjectId } = require('mongodb');
const ITEM_PER_PAGE = 6;

module.exports.index = async(req, res, next) => {
    const page = +req.query.page || 1;
    const productId = req.query.productId;
    const q = req.query.q;
    const totalProduct = await clothService.count();
    const filter = {};
    if (productId)
        filter.typeProduct = ObjectId(productId);
    if (q)
        filter.nameProduct = new RegExp(q, 'i');
    const products = await clothService.list(filter, page - 1, ITEM_PER_PAGE);
    // Get products from model
    //const products = await productService.list();
    // Pass data to view to display list of products
    res.render('index/body', {
        products: products,
        hasNextPage: ITEM_PER_PAGE * page < totalProduct,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        lastPage: Math.ceil(totalProduct / ITEM_PER_PAGE),
        ITEM_PER_PAGE: ITEM_PER_PAGE,
        currentPage: page,
        productId: productId,
        q: q,
    });

};