const bookModel = require('../models/clothModel');

exports.index = async(req, res, next) => {
    // Get books from model
    const cloths = await bookModel.list();
    console.log('books', cloths);
    // Pass data to view to display list of books
    res.render('books/list', { cloths: cloths });
};

exports.details = async(req, res, next) => {
    res.render('books/detail', await bookModel.get(req.params.id));
}