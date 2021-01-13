const { db } = require('../dal/db');
const { ObjectId } = require('mongodb');

exports.count = async(filter = {}) => {
    const usersCollection = await db().collection('user');
    return usersCollection.find(filter).count();
}

exports.list = async(filter = {}, pageIndex = 0, itemPerPage = 6) => {
    const usersCollection = db().collection('user');

    const users = await usersCollection.find(filter)
        .skip(pageIndex * itemPerPage)
        .limit(itemPerPage)
        .toArray();

    return users;
}

exports.getUserById = async(id) => {
    const user = await this.list({ _id: ObjectId(id) }, 0, 1);
    return user;
}

exports.update = async(id, activate) => {
    var f = true;
    var set = {};
    if (activate.toString().trim() === 'active') {
        set = {
            $set: {
                status: 'inactive'
            }
        }
    } else {
        set = {
            $set: {
                status: 'active'
            }
        }
    }
    try {
        await db().collection('user').updateOne({ _id: ObjectId(id) }, set);
    } catch (e) {
        console.log(e);
        f = false;
    }
    return f;
}