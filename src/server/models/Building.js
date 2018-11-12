/** @module models/Building */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Schema representing the street address of a building
 * @typedef  {Object}  Address
 * @prop  {String}  [streetNumber]  The building's street number
 * @prop  {String}  streetName  The name of the street
 * @prop  {String}  [unitNumber]  An additional unit, floor, suite, etc.
 * @prop  {String}  city  The building's city
 * @prop  {String}  state  The building's state
 * @prop  {String}  postalCode  The building's postal code
 * @prop  {String}  country  The building's country
 * @prop  {String}  latitude  The latitude coordinate
 * @prop  {String}  longitude  The longitude coordinate
 */

/**
 * Database subSchema for an address object
 * @const  AddressSchema
 * @type  {Schema}
 * @memberof  module:models/Building
 */

const AddressSchema = new Schema({
  streetNumber: { type: String },
  streetName: { type: String, required: true },
  unitNumber: { type: String, default: null },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
});

/**
 * Represents a complete building map
 * @typedef  {Object} Building
 * @memberof  module:models/Building
 * @prop  {String}  buildingName  the common name for the building
 * @prop  {Address}  address  A subdocument containing the address
 * @prop  {Number}  [numFloors=1]  How many floors are in the building
 * @prop  {Array.<Floorplan>}  floorplans  Virtual links to floorplans
 * @prop  {Boolean}  hasElevator  Is there an elevator?
 * @prop  {Boolean}  hasAccessibleEntrance  Is the entrance accessible?
 */

/**
 * Database object for a complete building
 * @const  BuildingSchema
 * @type  {Schema}
 * @memberof  module:models/Building
 */

const BuildingSchema = new Schema(
  {
    address: { type: AddressSchema, required: true },
    buildingName: {
      type: String,
      required: true,
      unique: true,
    },
    numFloors: {
      type: Number,
      required: true,
      default: 1,
    },
    hasElevator: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasAccessibleEntrance: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

BuildingSchema.virtual('floorplans', {
  ref: 'Floor',
  localField: '_id',
  foreignField: 'building',
});

/**
 * create a new building object
 * @async
 * @static createNew
 * @memberof module:models/Building
 * @returns {Promise.<BuildingData>} The new building details
 */

BuildingSchema.statics.createNew = async function createNew(buildingData) {
  try {
    const newBuilding = await this.create(buildingData);
    return newBuilding.populate('floorplans');
  } catch (err) {
    throw new Error(`Unable to save new building\n${err.message}`);
  }
};

/**
 * Get a complete list of buildings from the database
 * @async
 * @static getAll
 * @memberof module:models/Building
 * @returns {Promise.<BuildingData[]>} resolves to array of all Buildings
 *          in the databse
 */

BuildingSchema.statics.getAll = async function getAll() {
  try {
    return this.find().exec();
  } catch (err) {
    throw new Error(`Failed to fetch all buildings.\n\n${err.message}`);
  }
};

/**
 * Get a single building with the given id
 * @async
 * @static getOneById
 * @memberof module:models/Building
 * @param  {String}  buildingId  the mongo id of the building
 * @returns {Promise.<BuildingData>} The full building details
 */

BuildingSchema.statics.getOneById = async function getOneById(buildingId) {
  try {
    return this.findById(buildingId)
      .populate('floorplans')
      .exec();
  } catch (err) {
    throw new Error(`Could not find building ${buildingId}\n${err.message}`);
  }
};

/**
 * Get a single building with the given name
 * @async
 * @static getOneByName
 * @param {String} buildingName  The name of the building
 * @memberof module:models/Building
 * @returns {Promise.<BuildingData>} The full building details
 */

BuildingSchema.statics.getOneByName = async function getOneByName(
  buildingName
) {
  try {
    return this.findOne({ buildingName })
      .populate('floorplans')
      .exec();
  } catch (err) {
    throw new Error(`Could not find ${buildingName}\n${err.message}`);
  }
};

export default BuildingSchema;
