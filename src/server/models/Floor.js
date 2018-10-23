/** @module  models/Floor */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * represents JSONified SVG data
 * @typedef  {Object}  Layer
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
 * @memberof  module:models/Floor
 */

const LayerSchema = new Schema({
  _declaration: {
    _attributes: {
      version: String,
    },
  },
  svg: {
    _attributes: {
      xmlns: String,
      'xmlns:xlink': String,
      version: String,
      preserveAspectRatio: String,
      viewBox: String,
      width: String,
      height: String,
    },
    path: [
      {
        _attributes: {
          fill: String,
          stroke: String,
          'stroke-width': String,
          d: String,
        },
      },
    ],
  },
});

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
    layers: [{ type: LayerSchema }],
  },
  {
    toJSON: {
      getters: true,
      virtual: true,
    },
  }
);

FloorSchema.index({ building: 1, floorNumber: -1 });

FloorSchema.virtual('facilities', {
  ref: 'Facility',
  localField: 'floorplan',
  foreignField: '_id',
});

export default FloorSchema;
