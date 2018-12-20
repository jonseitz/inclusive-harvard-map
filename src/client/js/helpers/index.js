/** @module  client/helpers */

/**
 * simple reducer function to count up all the various facilities within a flooor or building
 * @memberof client/helpers
 * @method countFacilities
 * @param  {FacilityData[]}  FacilityList  A list of facilities associated with a particular area
 * @returns {Object}  Object with fields aggregating the various types of facility
 */

export const countFacilities = (facilityList, currentFloor = 'all') => (
  facilityList.reduce((count, current) => {
    const update = { ...count };
    if (currentFloor === 'all' || currentFloor === current.floorplan) {
      update[current.locationType] += 1;
    }
    return update;
  },
  {
    men: 0,
    women: 0,
    neutral: 0,
    lactation: 0,
  })
);
