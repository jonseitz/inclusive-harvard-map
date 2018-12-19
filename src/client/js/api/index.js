/** @module client/api */

/**
 * Get the complete list of buildings from the server
 * @async
 * @function  getBuildingList
 * @returns  {Promise.<MinimalBuildingData>}  The complete building list
 * @throws  {Error}  if the request fails
 */

export const getBuildingList = async () => {
  const response = await fetch('/api/buildings/all');
  if (!response.ok) {
    throw new Error('Failed to load building data.');
  }
  return response.json();
};

/**
 * Get the complete data for a single building
 * @async
 * @function  getSingleBuilding
 * @param  {String}  id  the mongo id of the building
 * @returns  {Promise.<BuildingData>}  The complete building data object
 * @throws  {Error}  if the request fails
 */

export const getSingleBuilding = async (id) => {
  const response = await fetch(`/api/buildings/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch building data');
  }
  return response.json();
};

/**
 * Get the data for a single layer of a building plan
 * @async
 * @function  getLayerData
 * @param  {String}  layerId  the mongo id of the desired layer
 * @return  {Promise.<LayerData>}  The complete layer object
 */

export const getLayerData = async (layerId) => {
  const response = await fetch(`/api/layers/${layerId}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
};

/**
 * Get the data for a single facility
 * @async
 * @function  getFacilityData
 * @param  {String}  facilityId  the mongo id of the desired facility
 * @return  {Promise.<Facility>}  The complete facility object
 */

export const getFacilityData = async (facilityId) => {
  const response = await fetch(`/api/facilities/${facilityId}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
};
