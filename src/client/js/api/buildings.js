export const getBuildingList = async () => {
  const response = await fetch('/api/buildings/all');
  if (!response.ok) {
    throw new Error('Failed to load building data.');
  }
  return response.json();
};

export const getSingleBuilding = async (id) => {
  const response = await fetch(`/api/buildings/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch building data');
  }
  return response.json();
};

export const getDirectionsToBuilding = async (startPoint, addressData) => {
  const [startLat, startLong] = startPoint;
  const { latitude, longitude } = addressData;
  const response = await fetch(`/osrm/${startLong},${startLat};${longitude},${latitude}?steps=true&overview=full`);
  if (!response.ok) {
    throw new Error(response.message);
  }
  return response.json();
};
