const { ObjectId } = require('mongodb');

const userModel = require('../models/userModel');
const ITEM_PER_PAGE = 12;

module.exports.index = async(req, res, next) => {
    const page = +req.query.page || 1;
    const q = req.query.q;
    const filter = {};
    if (q)
        filter.nameProduct = new RegExp(q, 'i');
    const totalProduct = await userModel.count(filter);
    const users = await userModel.list(filter, page - 1, ITEM_PER_PAGE);
    console.log(users);
    // Get products from model
    //const products = await productService.list();
    // Pass data to view to display list of products
    res.render('user/body', {
        title: 'Users list',
        navUser: 'active',
        users: users,
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

exports.editGet = async(req, res, next) => {
    const id = req.params.id;
    const user = await userModel.getUserById(id);
    console.log(user);
    var delBtn;
    if (user[0].status.toString().trim() === 'active') {
        delBtn = "DEACTIVATE USER";
    } else {
        delBtn = "ACTIVATE USER";
    }
    res.render('user/editUser', { navUser: 'active', title: 'User detail', delBtn: delBtn, body: user[0], id: id });
};

exports.activate = async(req, res, next) => {
    const id = req.params.id;
    const user = await userModel.getUserById(id);
    await userModel.update(id, user[0].status);
    res.redirect('/users/' + id);
}