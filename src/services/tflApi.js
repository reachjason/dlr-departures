const BASE_URL = 'https://api.tfl.gov.uk';
const ISLAND_GARDENS_STOP_ID = '940GZZDLISL';

export async function fetchDepartures() {
  const url = `${BASE_URL}/StopPoint/${ISLAND_GARDENS_STOP_ID}/Arrivals`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TfL API error: ${response.status} ${response.statusText}`);
  }

  const arrivals = await response.json();

  // Filter to DLR only, sort by timeToStation ascending
  return arrivals
    .filter((a) => a.modeName === 'dlr')
    .sort((a, b) => a.timeToStation - b.timeToStation)
    .map((a) => ({
      id: a.id,
      destination: a.destinationName,
      platform: a.platformName,
      timeToStation: a.timeToStation, // seconds
      expectedArrival: a.expectedArrival,
      currentLocation: a.currentLocation,
      towards: a.towards,
    }));
}
