/** @module models/Facility */
import mongoose from 'mongoose';

const { Schema } = mongoose;

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
  WOMEN: 'women',
  MEN: 'men',
  NEUTRAL: 'neutral',
  LACTATION: 'lactation',
};

/**
 * Descibes a single room within a building
 * @typedef  {Object}  Facility
 * @prop  {String}  building  The mongo id of the building
 * @prop  {String}  locationType  One of the enumerated room types
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
    building: {
      type: Schema.Types.ObjectId,
      ref: 'Building',
      required: true,
    },
    layerViewBox: [
      {
        type: 'Number',
        required: true,
      },
    ],
    locationType: {
      type: String,
      enum: Object.values(ROOM),
      required: true,
    },
    floorplan: {
      type: Schema.Types.ObjectId,
      ref: 'Floor',
      required: true,
    },
    path: {
      type: String,
      default: '',
    },
    isAccessible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      virtual: true,
    },
  }
);

FacilitySchema.index({
  floor: 1,
});

/**
 * Create a new facility Object
 * @async
 * @static createNew
 * @memberof module:models/Facility
 * @returns {Promise.<FacilityData>} the new facility data
 */

FacilitySchema.statics.createNew = async function createNew(facilityData) {
  try {
    const newFacility = await this.create(facilityData);
    return newFacility;
  } catch (err) {
    throw new Error(`unable to save facility\n${err.message}`);
  }
};

export default FacilitySchema;
