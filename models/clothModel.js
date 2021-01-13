const { db } = require('../dal/db');
const { ObjectId } = require('mongodb');

exports.list = async(filter = {}) => {
    console.log('model db');
    const productCollection = db().collection('cloth');
    const books = await productCollection.find(filter).toArray();
    console.dir(books);
    return books;
}

exports.count = async() => {
    const productsCollection = db().collection('cloth');
    return productsCollection.find({}).count();
}

exports.listPaginate = async(filter, pageIndex, itemPerPage) => {
    const productsCollection = db().collection('cloth');

    const cloths = await productsCollection.find(filter)
        .skip(pageIndex * itemPerPage)
        .limit(itemPerPage)
        .toArray();

    return cloths;
}

exports.get = async(id) => {
    const booksCollection = db().collection('cloth');
    const book = await booksCollection.findOne({ _id: ObjectId(id) })
    return book;
}