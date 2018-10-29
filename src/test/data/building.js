/** @module TestData/Building */

/**
 * A standard building, as returned from the API
 * @const mongoBuilding
 * @memberof  TestData/Building
 * @type  {BuildingData}
 */

export const mongoBuilding = {
  numFloors: 5,
  hasElevator: true,
  hasAccessibleEntrance: true,
  _id: '5bd662c964360203da3b54a0',
  buildingName: 'Maxwell Dworkin',
  address: {
    unitNumber: null,
    _id: '5bd662c964360203da3b54a1',
    streetNumber: '33',
    streetName: 'Oxford Street',
    city: 'Cambridge',
    state: 'Massachusetts',
    postalCode: '02138',
    country: 'USA',
    latitude: '42.3788',
    longitude: '-71.11739',
  },
  __v: 0,
  floorplans: [mongoFloorplan],
  id: '5bd662c964360203da3b54a0',
};
