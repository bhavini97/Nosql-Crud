const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


  let _client = null;
let _db = null;

const connectToMongo = async () => {
  if (_client && _db) {
    return { client: _client, db: _db }; // Reuse existing connection
  }

  try {
    _client = await MongoClient.connect(process.env.DB_URL);
    _db = _client.db(); 
    console.log("MongoDB Connected");
    return { client: _client, db: _db };
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

// using this in models will save us from making multiple mongo connection
const getDb = () => {
  if (!_db) throw new Error("Database not connected yet!");
  return _db;
};

module.exports = { connectToMongo, getDb };