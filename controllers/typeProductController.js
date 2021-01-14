const typeProductModel = require('../models/typeProductModel');

const { ObjectId } = require('mongodb');
const ITEM_PER_PAGE = 12;

module.exports.index = async(req, res, next) => {
    const page = +req.query.page || 1;
    const q = req.query.q;
    const filter = {};
    const totalProduct = await typeProductModel.count(filter);
    const products = await typeProductModel.list(filter, page - 1, ITEM_PER_PAGE);
    // console.log(products);
    // Get products from model
    //const products = await productService.list();
    // Pass data to view to display list of products
    res.render('typeProduct/body', {
        title: 'Product type list',
        navTypeProduct: 'active',
        products: products,
        hasNextPage: ITEM_PER_PAGE * page < totalProduct,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        lastPage: Math.ceil(totalProduct / ITEM_PER_PAGE),
        ITEM_PER_PAGE: ITEM_PER_PAGE,
        currentPage: page,
        q: q,
    });

};

exports.addGet = async(req, res, next) => {
    res.render('typeProduct/editTypeProduct', { navTypeProduct: 'active', title: 'Add new product type', btnText: 'ADD NEW', delBtn: 'hidden' });
};

exports.editGet = async(req, res, next) => {
    const id = req.params.id;
    const cloth = await typeProductModel.getTypeProductById(id);
    console.log(cloth);
    res.render('typeProduct/editTypeProduct', { navTypeProduct: 'active', title: 'Edit product type', body: cloth[0], btnText: 'CONFIRM CHANGES', id: id });
};

exports.remove = async(req, res, next) => {
    const id = req.params.id;
    const f = await typeProductModel.removeTypeProductById(id);
    res.redirect('/typeProduct');
};

exports.addPost = async(req, res, next) => {
    const body = req.body;
    console.log(body);
    await typeProductModel.add(body);
    res.render('typeProduct/editTypeProduct', { navTypeProduct: 'active', title: 'Add new product type', btnText: 'ADD NEW', delBtn: 'hidden' });

};

exports.editPost = async(req, res, next) => {
    console.log(req.body);
    const id = req.params.id;
    const body = req.body;
    const f = await typeProductModel.update(id, body);
    res.render('typeProduct/editTypeProduct', { navTypeProduct: 'active', title: 'Edit product type', body: body, btnText: 'CONFIRM CHANGES', id: id });
};