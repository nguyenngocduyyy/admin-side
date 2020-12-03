const clothModel = require('../models/clothModel');

exports.index = async(req, res, next) => {
    const cloths = await clothModel.list();
    res.render('index/body', { title: 'Store management', cloths: cloths });
};