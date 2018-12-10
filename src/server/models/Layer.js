/** @module  models/Layer */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * represents JSONified SVG data
 * @typedef  {Object}  LayerData
 * @prop  {Object}  _declaration
 * @prop  {Object}  _declaration._attributes
 * @prop  {String}  _declaration._attributes.version
 * @prop  {Object}  svg
 * @prop  {Object}  svg._attributes
 * @prop  {String}  svg._attributes.xmlns
 * @prop  {String}  svg._attributes.xmlns:xlink
 * @prop  {String}  svg._attributes.version
 * @prop  {String}  svg._attributes.preserveAspectRatio
 * @prop  {String}  svg._attributes.viewBox
 * @prop  {String}  svg._attributes.width
 * @prop  {String}  svg._attributes.height
 * @prop  {Array.<Object>}  svg.path
 * @prop  {Object}  svg.path._attributes
 * @prop  {String}  svg.path.fill
 * @prop  {String}  svg.path.stroke
 * @prop  {String}  svg.path.stroke-width
 * @prop  {String}  svg.path.d
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
