const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://nguyentanvinh7a:01685698193@cluster0.ebrk4.mongodb.net/<dbname>?authSource=admin&replicaSet=atlas-bdcukd-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

let database;

async function connectDb() {
    await client.connect();
    // Establish and verify connection
    database = await client.db("store");
    console.log('Db connected!');
}

console.log('RUNNING DB...');

connectDb();

const db = () => database;

module.exports.db = db;