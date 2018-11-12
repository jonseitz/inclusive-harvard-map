import mongoose from 'mongoose';

const connectionString = `mongodb://${process.env.MONGO_URI}/${process.env.MONGO_INITDB_DATABASE}`;

const options = {
  keepAlive: true,
  useNewUrlParser: true,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,

};

const db = mongoose.createConnection(connectionString, options);

export default db;
