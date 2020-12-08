const bookModel = require('../models/clothModel');
const ITEM_PER_PAGE = 6;

exports.index = async(req, res, next) => {
    const page = +req.query.page || 1;
    const productId = req.query.productId;
    const q = req.query.q;
    const totalProduct = await productService.count();
    const filter = {};
    if (productId)
        filter.typeProduct = ObjectId(productId);
    if (q)
        filter.nameProduct = new RegExp(q, 'i');
    const cloths = await bookModel.listPaginate(filter, page - 1, ITEM_PER_PAGE);
    console.log(cloths);
    // Pass data to view to display list of books
    res.render('books/list', {
        cloths: cloths,
        hasNextPage: ITEM_PER_PAGE * page < totalProduct,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        lastPage: Math.ceil(totalProduct / ITEM_PER_PAGE),
        ITEM_PER_PAGE: ITEM_PER_PAGE,
        currentPage: page,
        productId: productId,
        q: q
    });
};