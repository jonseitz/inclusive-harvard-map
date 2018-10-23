import mongoose from 'mongoose';
import models from './models';

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

db.model('Building', models.BuildingSchema);
db.model('Facility', models.FacilitySchema);
db.model('Floor', models.FloorSchema);

export default db;
