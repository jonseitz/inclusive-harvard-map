/** @module  models/Layer */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * represents JSONified SVG data
 * @typedef  {Object}  LayerData
 * @prop  {String}  floor  the mongo id of the floor it represents
 * @prop  {String}  layerName  Name of the layer as taken from the DXF file
 * @prop  {String[]}  layerData  Array of transformations to be fet to an svg path element's d attribute
 * @prop  {Number[]}  layerViewBox  The minX, MinY, Width, and Height of the entire floor
 */

/**
 * Database schema for SVG layers
 * @const  LayerSchema
 * @memberof  module:models/Layer
 */

const LayerSchema = new Schema({
  floor: {
    type: Schema.Types.ObjectId,
    ref: 'Floor',
    required: true,
  },
  layerName: {
    type: 'String',
    required: true,
  },
  layerData: [
    {
      type: 'String',
      required: true,
    },
  ],
  layerViewBox: [
    {
      type: 'Number',
      required: true,
    },
  ],
});

/**
 * Returns all floor objects in the datbase
 * @async
 * @static getAll
 * @memberof module:models/layer
 * @returns {Promise.<LayerData[]>}  All of the floor data for a building
 */

LayerSchema.statics.getAll = async function getAll() {
  try {
    return this.find({}).exec();
  } catch (err) {
    throw new Error(`Could not retrieve all layer objects.\n${err.message}`);
  }
};

/**
 * Returns one complete floor object
 * @async
 * @static getOneById
 * @memberof module:models/layer
 * @param {String} layerId  The mongo id of the floor
 * @returns {Promise.<LayerData>}  the compmlete floor object
 */

LayerSchema.statics.getOneById = async function getOneById(layerId) {
  try {
    return this.findById(layerId)
      .exec();
  } catch (err) {
    throw new Error(
      `Could not retrieve floor object ${layerId}.\n${err.message}`
    );
  }
};

/**
 * Creates a new floor object
 * @async
 * @static createNew
 * @memberof module:models/layer
 * @param {LayerData} layerData the new floor to create
 * @returns {LayerData}  The mongofied floor data object
 */

LayerSchema.statics.createNew = async function createNew(layerData) {
  try {
    const newLayer = await this.create(layerData);
    return newLayer;
  } catch (err) {
    throw new Error(`Could not create new Floor.${err.message}`);
  }
};

export default LayerSchema;
