// TODO  add method to fetch floor data

export const getLayerData = async (layerId) => {
  const response = await fetch(`/api/layers/${layerId}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
};
