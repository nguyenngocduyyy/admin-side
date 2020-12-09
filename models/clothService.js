const { db } = require('../dal/db');
const { ObjectId } = require('mongodb');
const productMongo = require('./clothModel');

exports.count = async() => {
    const productsCollection = db().collection('cloth');
    return productsCollection.find({}).count();
}

exports.list = async(filter, pageIndex, itemPerPage) => {
    const productsCollection = db().collection('cloth');

    const products = await productsCollection.find(filter)
        .skip(pageIndex * itemPerPage)
        .limit(itemPerPage)
        .toArray();

    return products;
}