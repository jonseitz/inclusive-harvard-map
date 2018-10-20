/** @module models/Facility */

import { Schema } from 'mongoose';

/**
 * Enum for different room types
 * @const ROOM
 * @memberof  module:models/Facility
 * @type  {Object}
 * @prop  {String}  WOMEN  Restroom designated for women only
 * @prop  {String}  MEN  Restroom designated for men only
 * @prop  {String}  NEUTRAL  Gender-neutral restroom
 * @prop  {String}  LACT  lactation room
 */

export const ROOM = {
  WOMEN: 'Women-only Restroom',
  MEN: 'Men-only Restroom',
  NEUTRAL: 'Gender-neutral Restroom',
  LACT: 'Lactation Room',
};

/**
 * Descibes a single room within a building
 * @typedef  {Object}  Facility
 * @prop  {String}  locationType  One of the enumerated room types
 * @prop  {String}  roomNumber  Its room number
 * @prop  {String}  directions  A textual-description of how to reach the room
 * @prop  {ObjectId}  floorplan  The corresponding floorplan object
 * @prop  {Number}  xPos  The x-coordinate of its location on the floorplan
 * @prop  {Number}  yPos  The y-coordinate of its location on the floorplan
 * @prop  {Boolean}  isAccessible  Whether the room is handicapped accessible
 */

/**
 * Database object for a single room
 * @const  FacilitySchema
 * @type  {Schema}
 * @memberof  module:models/Facility
 */

const FacilitySchema = new Schema(
  {
    locationType: {
      type: String,
      enum: Object.values(ROOM),
      required: true,
    },
    roomNumber: { type: String, required: true },
    directions: { type: String, default: 'N/A' },
    floorplan: {
      Type: Schema.Type.ObjectId,
      ref: 'Floorplan',
      required: true,
    },
    xPos: { type: Number, required: true },
    yPos: { type: Number, required: true },
    isAccessible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    toJSON: {
      getters: true,
      virtual: true,
    },
  }
);

FacilitySchema.index({
  building: 1,
  floor: 1,
  room: 1,
});

export default FacilitySchema;
