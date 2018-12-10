/** @module  models/Floor */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Represents a single floor within a building
 * @const
 * @typedef  {Object}  Floor
 * @prop  {ObjectId}  building  reference to the associated building
 * @prop  {String}  floorNumber  which floor this is
 * @prop  {Array.<Facility>} facilities  Virtual links to Facilities
 * @prop  {Array.<Layer>} layers  A collection of JSON objects
 *        representing SVG data for each floor
 */

/**
 * Database schema for a single Floor inside a building layers
 * @const  FloorSchema
 * @memberof  module:models/Floor
 */

const FloorSchema = new Schema(
  {
    building: {
      type: Schema.Types.ObjectId,
      ref: 'Building',
      required: true,
    },
    floorNumber: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      virtual: true,
    },
  }
);

FloorSchema.index({ building: 1, floorNumber: 1 }, { unique: true });

FloorSchema.virtual('facilities', {
  ref: 'Facility',
  localField: '_id',
  foreignField: 'floorplan',
});

FloorSchema.virtual('layers', {
  ref: 'Layer',
  localField: '_id',
  foreignField: 'floor',
});

/**
 * Returns all floor objects in the datbase
 * @async
 * @static getAll
 * @memberof module:models/floor
 * @returns {Promise.<FloorData[]>}  All of the floor data for a building
 */

FloorSchema.statics.getAll = async function getAll() {
  try {
    return this.find({}).exec();
  } catch (err) {
    throw new Error(`Could not retrieve all floor objects.\n${err.message}`);
  }
};

/**
 * Returns one complete floor object
 * @async
 * @static getOneById
 * @memberof module:models/floor
 * @param {String} floorId  The mongo id of the floor
 * @returns {Promise.<FloorData>}  the compmlete floor object
 */

FloorSchema.statics.getOneById = async function getOneById(floorId) {
  try {
    return this.findById(floorId)
      .populate({
        path: 'layers',
        select: '_id',
      })
      // .select('building floorNumber layers')
      .exec();
  } catch (err) {
    throw new Error(
      `Could not retrieve floor object ${floorId}.\n${err.message}`
    );
  }
};

/**
 * Creates a new floor object
 * @async
 * @static createNew
 * @memberof module:models/floor
 * @param {FloorData} floorData the new floor to create
 * @returns {FloorData}  The mongofied floor data object
 */

FloorSchema.statics.createNew = async function createNew(floorData) {
  try {
    const newFloor = await this.create(floorData);
    return newFloor;
  } catch (err) {
    throw new Error(`Could not create new Floor.${err.message}`);
  }
};

export default FloorSchema;
