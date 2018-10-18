import { Schema } from 'mongoose';
/**
 *  Database object for storing a single floorplan
 *  @module  models/Floorplan
 */

/**
 *  Schema for storing JSONified SVG data
 *  @const
 *  @prop  {Object}  _declaration
 *  @prop  {Object}  _declaration._attributes
 *  @prop  {String}  _declaration._attributes.version
 *  @prop  {Object}  svg
 *  @prop  {Object}  svg._attributes
 *  @prop  {String}  svg._attributes.xmlns
 *  @prop  {String}  svg._attributes.xmlns:xlink
 *  @prop  {String}  svg._attributes.version`
 *  @prop  {String}  svg._attributes.preserveAspectRatio
 *  @prop  {String}  svg._attributes.viewBox
 *  @prop  {String}  svg._attributes.width
 *  @prop  {String}  svg._attributes.height
 *  @prop  {Array.<Object>}  svg.path
 *  @prop  {<Object>}  svg.path._attributes
 *  @prop  {String}  svg.path.fill
 *  @prop  {String}  svg.path.stroke
 *  @prop  {String}  svg.path.stroke-width
 *  @prop  {String}  svg.path.d
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
 *  Represents the floorplan of a single floor within a building
 *  @const
 *  @prop  {String}  buildingName  The common name of the building
 *  @prop  {String}  floorNumber  The floor being rendered
 *  @prop  {Array.<LayerSchema>} layers  A collection of JSON objects
 *         representing SVG data for each floor
 */

const FloorplanSchema = new Schema({
  buildingName: { type: String, required: true },
  floorNumber: { type: String, required: true },
  layers: [{ type: LayerSchema, required: true }],
});

export default FloorplanSchema;
