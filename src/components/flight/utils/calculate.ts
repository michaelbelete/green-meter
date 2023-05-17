export const convertKilometersToMiles = (km: number) => {
  return Math.round(km * 0.621371);
};

export const calculateFlightDuration = (distanceKm: number) => {
  const minSpeed = 740;
  const maxSpeed = 930;

  const minDuration = distanceKm / maxSpeed;
  const maxDuration = distanceKm / minSpeed;

  if (minDuration === maxDuration) return `${Math.round(minDuration)} hours`;
  return `${Math.round(minDuration)} - ${Math.round(maxDuration)} hours`;
};
