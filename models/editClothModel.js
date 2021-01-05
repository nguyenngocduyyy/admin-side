const { ObjectId } = require('mongodb');
const { db } = require('../dal/db');
const clothModel = require('../models/clothModel');



exports.getClothById = async(id) => {
    const cloth = await clothModel.list({ _id: ObjectId(id) });
    return cloth;
}

exports.listTypeProduct = async(filter = {}) => {
    const typeProduct = await db().collection('TypeProduct').find(filter).toArray();
    console.log(typeProduct);
    return typeProduct;
}

exports.removeClothById = async(id) => {
    var f = true;
    try {
        await db().collection('cloth').deleteOne({ _id: ObjectId(id) });
    } catch (e) {
        console.log(e);
        f = false;
    }
    return f;
}

exports.add = async(cloth) => {
    try {
        console.log(cloth);
        const typeProduct = await this.listTypeProduct({ nameTypeProduct: cloth.typeProduct });
        console.log(typeProduct[0]._id);
        await db().collection('cloth').insertOne({
            nameProduct: cloth.nameProduct,
            imgSrc: cloth.imgSrc,
            productDescription: cloth.productDescription,
            price: cloth.price,
            typeProduct: ObjectId(typeProduct[0]._id)
        });
    } catch (e) {
        console.log(e);
    }
    return cloth;
}

exports.update = async(id, cloth) => {
    var f = true;
    try {
        const typeProduct = await this.listTypeProduct({ nameTypeProduct: cloth.typeProduct });
        console.log(typeProduct[0]._id);
        await db().collection('cloth').updateOne({ _id: ObjectId(id) }, {
            $set: {
                nameProduct: cloth.nameProduct,
                imgSrc: cloth.imgSrc,
                productDescription: cloth.productDescription,
                price: cloth.price,
                typeProduct: ObjectId(typeProduct[0]._id)
            }
        });
    } catch (e) {
        console.log(e);
        f = false;
    }
    return f;
}