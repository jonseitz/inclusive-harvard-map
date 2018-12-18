import mongoose from 'mongoose';
import BuildingSchema from './Building';
import FloorSchema from './Floor';
import FacilitySchema from './Facility';
import LayerSchema from './Layer';

const connectionString = `mongodb://${process.env.MONGO_URI}/${process.env.MONGO_INITDB_DATABASE}`;

const options = {
  keepAlive: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
};

const db = mongoose.createConnection(connectionString, options);

db.model('Building', BuildingSchema);
db.model('Floor', FloorSchema);
db.model('Facility', FacilitySchema);
db.model('Layer', LayerSchema);

export default db;

