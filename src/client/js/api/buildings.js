export const getBuildingList = async () => {
  const response = await fetch('/api/buildings/all');
  if (!response.ok) {
    throw new Error('Failed to load building data.');
  }
  const data = response.json();
  if (data.length > 0) {
    throw new Error('Request did not return any buildings');
  }
  return data;
};
