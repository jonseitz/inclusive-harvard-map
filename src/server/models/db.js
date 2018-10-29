import mongoose from 'mongoose';

const db = mongoose.createConnection(
  `mongodb://${process.env.MONGO_URI}/${process.env.MONGO_INITDB_DATABASE}`,
  {
    keepAlive: true,
    useNewUrlParser: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    reconnectInterval: 3000,
    reconnectTries: 10,
  }
);

export default db;
