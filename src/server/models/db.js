import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import BuildingSchema from './Building';
import FloorSchema from './Floor';
import FacilitySchema from './Facility';
import LayerSchema from './Layer';

export default async () => {
  let db;
  if (process.env.NODE_ENV === 'testing') {
    const mongod = new MongoMemoryServer();
    const connectionString = await mongod.getConnectionString();
    const options = {
      keepAlive: false,
      useCreateIndex: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      // socketTimeoutMS: 1000,
      useNewUrlParser: true,
    };
    db = mongoose.createConnection(connectionString, options);
    db.on('disconnected', async () => {
      await mongod.stop();
    });
  } else {
    const connectionString = `mongodb://${process.env.MONGO_URI}/${process.env.MONGO_INITDB_DATABASE}`;

    const options = {
      keepAlive: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,

    };
    db = mongoose.createConnection(connectionString, options);
  }

  db.model('Building', BuildingSchema);
  db.model('Floor', FloorSchema);
  db.model('Facility', FacilitySchema);
  db.model('Layer', LayerSchema);

  return db;
};

