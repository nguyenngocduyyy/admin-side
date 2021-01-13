const { db } = require('../dal/db');
const { ObjectId } = require('mongodb');
const editClothModel = require('./editClothModel');

exports.count = async(filter = {}) => {
    const productsCollection = await db().collection('cloth');
    return productsCollection.find(filter).count();
}

exports.list = async(filter, pageIndex, itemPerPage) => {
    const productsCollection = db().collection('cloth');

    const products = await productsCollection.find(filter)
        .skip(pageIndex * itemPerPage)
        .limit(itemPerPage)
        .toArray();
    for (var product of products) {
        const name = await editClothModel.listTypeProduct({ _id: ObjectId(product.typeProduct) });
        product.typeProduct = name[0].nameTypeProduct;
    }
    // console.log("Cloth service\n\n\n" + products);

    return products;
}