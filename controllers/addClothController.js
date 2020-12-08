const addClothModel = require('../models/addClothModel');

exports.index = async(req, res, next) => {
    const typeProduct = await addClothModel.listTypeProduct();
    console.log(typeProduct);
    res.render('index/addCloth', { title: 'Add new cloth', typeProduct: typeProduct, btnText: 'ADD', delBtn: 'hidden' });
};

exports.editGet = async(req, res, next) => {
    const id = req.params.id;
    const cloth = await addClothModel.getClothById(id);
    console.log(cloth);
    const typeProduct = await addClothModel.listTypeProduct();
    res.render('index/addCloth', { title: 'Edit cloth', body: cloth[0], typeProduct: typeProduct, btnText: 'EDIT', id: id });
};

exports.remove = async(req, res, next) => {
    const id = req.params.id;
    const f = await addClothModel.removeClothById(id);
    res.redirect('/');
};

exports.add = async(req, res, next) => {
    const body = req.body;
    console.log(body);
    const f = await addClothModel.add(body);
    const typeProduct = await addClothModel.listTypeProduct();
    res.render('index/addCloth', { title: 'Add new cloth', f: f, body: body, typeProduct: typeProduct, btnText: 'ADD', delBtn: 'hidden' });
};

exports.editPost = async(req, res, next) => {
    console.log(req.body);
    const id = req.params.id;
    const body = req.body;
    const f = await addClothModel.update(id, body);
    const typeProduct = await addClothModel.listTypeProduct();
    res.render('index/addCloth', { title: 'Edit cloth', f: f, body: body, typeProduct: typeProduct, btnText: 'EDIT', id: id });
};