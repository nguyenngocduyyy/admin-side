const { db } = require('../dal/db');

exports.add = async(cloth) => {
    console.log(cloth);
    await db().collection('cloth').insertOne({
        nameProduct: cloth.nameProduct,
        imgSrc: cloth.imgSrc,
        productDescription: cloth.productDescription,
        price: cloth.price
    });
}