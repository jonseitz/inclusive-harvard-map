/** @module  test/populateDB */

import * as models from '../../server/models';
import * as dummy from '../data';

/**
 * Runs through a list of building data and adds to mongodb
 * @async
 * @method  populateFloors
 * @memberof  test/populateDB
 * @param  {BuildingData[]}  rawBuildings  the buildings to add to db
 * @returns  {Promise.<BuildingData[]>}  the mongo-fied versions of the data
 */
export const populateBuildings = async (rawBuildings) => {
  return Promise.all(
    rawBuildings.map((bldg) => {
      return models.Building.createNew(bldg);
    })
  );
};

/**
 * Runs through a list of floors, assigned each to a building, and pushes to mongo.
 * @async
 * @method  populateFloors
 * @memberof  test/populateDB
 * @param  {FloorData[]}  rawFloors  the floors to add to the db
 * @param  {BuildingData[]}  mongoBuildings  the buildins for assignment
 * @returns  {Promise.<FloorData[]>}  the mongo-fied versions of the data
 */

export const populateFloors = async (rawFloors, mongoBuildings) => {
  const assignedFloors = [...dummy.rawFloors];
  const buildingCount = mongoBuildings.length;
  const floorCount = rawFloors.length;
  if (buildingCount >= floorCount) {
    // if there are enough buildings to go around, just assign in order
    assignedFloors.forEach((e, i) => {
      e.building = mongoBuildings[i].id;
    });
  } else {
    // if not, loop through the building array until every floor is assiged
    let b = 0;
    for (let i = 0; i < floorCount; i++) {
      assignedFloors[i].building = mongoBuildings[b].id;
      // reassign the looper to 0 when we hit the end of the array
      b = b === buildingCount - 1 ? 0 : b + 1;
    }
  }
  return Promise.all(
    assignedFloors.map((floor) => {
      return models.Floor.createNew(floor);
    })
  );
};

/**
 * Insert lists of floors and buildings into the database
 * @async
 * @method  populateDB
 * @memberof  test/populateDB
 * @param  {BuildingData[]}  [rawBuildings]  The buildings that should be inserted. Defaults to the dummy data.
 * @param  {FloorData[]}  [rawFloors]  The floors that should be inserted. Defaults to the dummy data.
 * @returns  {Promise.<Object>}  Resolves to an object with buildings and floors keys
 */
export default async (
  rawBuildings = dummy.rawBuildings,
  rawFloors = dummy.rawFloors
) => {
  const mongoBuildings = await populateBuildings(rawBuildings);
  const mongoFloors = await populateFloors(rawFloors, mongoBuildings);
  return {
    buildings: mongoBuildings,
    floors: mongoFloors,
  };
};
