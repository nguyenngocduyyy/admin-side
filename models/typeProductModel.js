const { db } = require('../dal/db');
const { ObjectId } = require('mongodb');

exports.count = async(filter = {}) => {
    const typeProductCollection = await db().collection('TypeProduct');
    return typeProductCollection.find(filter).count();
}

exports.list = async(filter, pageIndex, itemPerPage) => {
    const typeProductCollection = db().collection('TypeProduct');

    const products = await typeProductCollection.find(filter)
        .skip(pageIndex * itemPerPage)
        .limit(itemPerPage)
        .toArray();

    return products;
}

exports.getTypeProductById = async(id) => {
    const cloth = await this.list({ _id: ObjectId(id) }, 0, 1);
    return cloth;
}

exports.removeTypeProductById = async(id) => {
    var f = true;
    try {
        await db().collection('TypeProduct').deleteOne({ _id: ObjectId(id) });
    } catch (e) {
        console.log(e);
        f = false;
    }
    return f;
}

exports.add = async(typeProduct) => {
    try {
        console.log(typeProduct);
        await db().collection('TypeProduct').insertOne({
            nameTypeProduct: typeProduct.nameTypeProduct
        });
    } catch (e) {
        console.log(e);
    }
    return typeProduct;
}

exports.update = async(id, typeProduct) => {
    var f = true;
    try {
        await db().collection('TypeProduct').updateOne({ _id: ObjectId(id) }, {
            $set: {
                nameTypeProduct: typeProduct.nameTypeProduct
            }
        });
    } catch (e) {
        console.log(e);
        f = false;
    }
    return f;
}