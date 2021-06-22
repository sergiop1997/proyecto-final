const { MongoClient } = require('mongodb');

const dbName = 'examen';
const url = `mongodb://localhost:27017/${dbName}`;
const client = new MongoClient(url, { useUnifiedTopology: true });

module.exports = client;