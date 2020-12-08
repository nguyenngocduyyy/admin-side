const { db } = require('../dal/db');
const { ObjectId } = require('mongodb');

exports.list = async(filter = {}) => {
    console.log('model db');
    const booksCollection = db().collection('cloth');
    const books = await booksCollection.find(filter).toArray();
    console.dir(books);
    return books;
}

exports.get = async(id) => {
    const booksCollection = db().collection('cloth');
    const book = await booksCollection.findOne({ _id: ObjectId(id) })
    return book;
}