const addClothModel = require('../models/addClothModel');

exports.index = (req, res, next) => {
    res.render('index/addCloth', { title: 'Add cloth' });
};

exports.add = async(req, res, next) => {
    console.log(req.body);
    const cloths = await addClothModel.add(req.body);
    res.render('index/addCloth', { title: 'Add cloth' });
};