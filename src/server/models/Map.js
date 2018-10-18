import { Schema } from 'mongoose';

/**
 * Database object for a building map
 * @module  models/Map
 */

/**
 *  Schema representing the street address of a building
 *  @const
 *  @prop  {String}  [streetNumber]  The building's street number
 *  @prop  {String}  streetName  The name of the street
 *  @prop  {String}  [unitNumber]  An additional unit, floor, suite, etc.
 *  @prop  {String}  city  The building's city
 *  @prop  {String}  state  The building's state
 *  @prop  {String}  postalCode  The building's postal code
 *  @prop  {String}  country  The building's country
 *  @prop  {String}  latitude  The latitude coordinate
 *  @prop  {String}  longitude  The longitude coordinate
 */

const AddressSchema = new Schema({
  streetNumber: { type: String },
  streetName: { type: String, required: true },
  unitNumber: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
});

/**
 *  Schema representing the complete building map
 *  @const
 *  @prop  {String}  buildingName  the common name for the building
 *  @prop  {AddressSchema}  address  A subdocument containing the address
 *  @prop  {Number}  [numFloors=1]  How many floors are in the building
 *  @prop  {Array.<module:models/Floorplan>}  floorplans  links to floorplans
 *  @prop  {Boolean}  hasElevator  Is there an elevator?
 *  @prop  {Boolean}  hasAccessibleEntrance  Is the entrance accessible?
 *  @prop  {Boolean}  hasGNR  Is there a gender-neutral restroom?
 *  @prop  {Boolean}  hasLacRoom  Is there a lactation room?
 */

const MapSchema = new Schema(
  {
    buildingName: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    numFloors: { type: Number, required: true, default: 1 },
    floorplans: [
      { type: Schema.types.ObjectId, ref: 'Floorplan', default: [] },
    ],
    hasFloorplans: { type: Boolean, required: true, default: false },
    hasElevator: { type: Boolean, required: true, default: null },
    hasAccessibleEntrance: { type: Boolean, required: true, default: null },
    hasGNR: { type: Boolean, required: true, default: null },
    hasLacRoom: { type: Boolean, required: true, default: null },
  },
  {
    toObject: {
      getters: true,
      virtuals: true,
    },
    toJSON: {
      getters: true,
      virtual: true,
    },
  }
);
/**
 *  Determines whether this map has associated floorplan data
 *  @returns {Boolean}  whether floorplans exist for this map
 */

MapSchema.virtual('hasFloorplans').get(() => {
  return this.floorplans.length > 0;
});

export default MapSchema;
