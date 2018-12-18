import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import BuildingSchema from '../../server/models/Building';
import FloorSchema from '../../server/models/Floor';
import FacilitySchema from '../../server/models/Facility';
import LayerSchema from '../../server/models/Layer';

export default async () => {
  const mongod = new MongoMemoryServer();
  const connectionString = await mongod.getConnectionString();
  const options = {
    keepAlive: false,
    useCreateIndex: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    socketTimeoutMS: 1000,
    useNewUrlParser: true,
  };
  const db = mongoose.createConnection(connectionString, options);
  db.on('disconnected', async () => {
    await mongod.stop();
  });

  db.model('Building', BuildingSchema);
  db.model('Floor', FloorSchema);
  db.model('Facility', FacilitySchema);
  db.model('Layer', LayerSchema);

  return db;
};

