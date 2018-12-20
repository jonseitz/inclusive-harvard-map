/** @module TestData/Building */

// import mongoFloorplan from './floor';

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
  floorplans: [],
  facilities: [],
  id: '5bd662c964360203da3b54a0',
};

/**
 * A list of buildings, as returned from the API
 * @const mongoBuildingArray
 * @memberof  TestData/Building
 * @type  {MinimalBuildingData[]}
 */
export const mongoBuildingArray = [
  {
    id: '5bd662c064360203da3ad374',
    buildingName: 'Pierce Hall',
    address: {
      latitude: '42.37824',
      longitude: '-71.11715',
    },
  },
  {
    id: '5bd662c164360203da3ad71b',
    buildingName: 'Northwest Building',
    address: {
      latitude: '42.37946',
      longitude: '-71.11568',
    },
  },
  {
    id: '5bd662c964360203da3b54a0',
    buildingName: 'Maxwell Dworkin',
    address: {
      latitude: '42.3788',
      longitude: '-71.11739',
    },
  },
];

/**
 * A standard building before it's added to the api
 * @const rawBuilding
 * @memberof  TestData/Building
 * @type  {BuildingData}
 */

export const rawBuilding = {
  buildingName: 'Maxwell Dworkin',
  numFloors: 5,
  hasElevator: true,
  hasAccessibleEntrance: true,
  address: {
    streetNumber: '33',
    streetName: 'Oxford Street',
    city: 'Cambridge',
    state: 'Massachusetts',
    postalCode: '02138',
    country: 'USA',
    latitude: '42.3788',
    longitude: '-71.11739',
  },
};

export const rawBuildingTwo = {
  buildingName: 'Pierce Hall',
  numFloors: 7,
  hasElevator: true,
  hasAccessibleEntrance: true,
  address: {
    streetNumber: '29',
    streetName: 'Oxford Street',
    city: 'Cambridge',
    state: 'Massachusetts',
    postalCode: '02138',
    country: 'USA',
    latitude: '42.37824',
    longitude: '-71.11715',
  },
};

export const newRawBuilding = {
  buildingName: 'John Hancock',
  numFloors: 5,
  hasElevator: true,
  hasAccessibleEntrance: true,
  address: {
    streetNumber: '220',
    streetName: 'Clarendon Street',
    city: 'Boston',
    state: 'Massachusetts',
    postalCode: '02116',
    country: 'USA',
    latitude: '42.3493',
    longitude: '-71.0751',
  },
};
export const rawBuildings = [rawBuilding, rawBuildingTwo];
