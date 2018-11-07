import * as models from '../../server/models';
import db from '../../server/models/db';
import * as dummy from '../data';

export const populateFloors = async () => {
  return Promise.all(
    dummy.rawFloors.map((floor) => {
      return models.Floor.createNew(floor);
    })
  );
};

export const populateBuildings = async () => {
  return Promise.all(
    dummy.rawBuildings.map((bldg) => {
      return models.Building.createNew(bldg);
    })
  );
};

export default async () => {
  const newBuilding = await models.Building.createNew(dummy.rawBuilding);
  const newFloor = await models.Floor.createNew({
    ...dummy.rawFloor,
    building: newBuilding.id,
  });
  return {
    newBuilding,
    newFloor,
  };
};
