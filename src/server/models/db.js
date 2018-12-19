import mongoose from 'mongoose';
import BuildingSchema from './Building';
import FloorSchema from './Floor';
import FacilitySchema from './Facility';
import LayerSchema from './Layer';

/**
 * Exports a mongoose connection to the running mongodb instance.
 * Determines connection from environment variables
 * @module server/db
 */

/**
 * Assembles the connection string from the mongo uri and the database name
 * @private
 * @const connectionString
 * @type {String}
 */

const connectionString = `mongodb://${process.env.MONGO_URI}/${process.env.MONGO_INITDB_DATABASE}`;

/**
 * Configure options for the connection to the mongodb
 * @private
 * @const options
 * @type {Object}
 */

const options = {
  keepAlive: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
};

/**
 * uses createConnection to export a common, default connection to mongo
 * @const db
 */

const db = mongoose.createConnection(connectionString, options);

// initialize mognoose models
db.model('Building', BuildingSchema);
db.model('Floor', FloorSchema);
db.model('Facility', FacilitySchema);
db.model('Layer', LayerSchema);

export default db;

