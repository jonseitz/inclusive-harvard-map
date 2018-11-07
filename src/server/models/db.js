import mongoose from 'mongoose';

const connectionString = process.env.NODE_ENV === 'testing'
  ? 'mongodb://localhost:28018/testing'
  : `mongodb://${process.env.MONGO_URI}/${process.env.MONGO_INITDB_DATABASE}`;

const db = mongoose.createConnection(connectionString, {
  keepAlive: true,
  useNewUrlParser: true,
  user: process.env.NODE_ENV === 'testing' ? '' : process.env.MONGO_USER,
  pass: process.env.NODE_ENV === 'testing' ? '' : process.env.MONGO_PASS,
  reconnectInterval: 3000,
  reconnectTries: 10,
});

export default db;
