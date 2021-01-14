const editClothModel = require('../models/editClothModel');
const formidable = require('formidable');
const { cloudinary } = require('../dal/cloudinary');

var form = new formidable();

exports.index = async(req, res, next) => {
    const typeProduct = await editClothModel.listTypeProduct();
    console.log(typeProduct);
    res.render('index/editCloth', { navProduct: 'active', title: 'Add new cloth', typeProduct: typeProduct, btnText: 'ADD NEW', delBtn: 'hidden', body: { imgSrc: 'Select file...' } });
};

exports.editGet = async(req, res, next) => {
    const id = req.params.id;
    const cloth = await editClothModel.getClothById(id);
    console.log(cloth);
    const typeProduct = await editClothModel.listTypeProduct();
    res.render('index/editCloth', { navProduct: 'active', title: 'Edit cloth', body: cloth[0], typeProduct: typeProduct, btnText: 'CONFIRM CHANGES', id: id });
};

exports.remove = async(req, res, next) => {
    const id = req.params.id;
    const f = await editClothModel.removeClothById(id);
    res.redirect('/');
};

exports.add = async(req, res, next) => {
    await form.parse(req, (err, fields, files) => {
        var body;
        body = fields;
        console.log(files);
        cloudinary.uploader.upload(files.imgSrc.path, async result => {
            console.log(result);
            body.imgSrc = result.url;
            console.log(body);
            await editClothModel.add(body);
            const typeProduct = await editClothModel.listTypeProduct();
            res.render('index/editCloth', { navProduct: 'active', title: 'Add new cloth', typeProduct: typeProduct, btnText: 'ADD NEW', delBtn: 'hidden', body: { imgSrc: 'Select file...' } });
        });
    });
};

exports.editPost = async(req, res, next) => {
    await form.parse(req, (err, fields, files) => {
        var body;
        body = fields;
        console.log(files);
        cloudinary.uploader.upload(files.imgSrc.path, async result => {
            console.log(result);
            body.imgSrc = result.url;
            console.log(body);
            editClothModel.add(body);
            console.log(req.body);
            const id = req.params.id;
            const f = await editClothModel.update(id, body);
            const typeProduct = await editClothModel.listTypeProduct();
            res.render('index/editCloth', { navProduct: 'active', title: 'Edit cloth', f: f, body: body, typeProduct: typeProduct, btnText: 'CONFIRM CHANGES', id: id });
        });
    });
};