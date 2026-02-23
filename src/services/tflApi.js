const BASE_URL = 'https://api.tfl.gov.uk';
const ISLAND_GARDENS_STOP_ID = '940GZZDLISL';

const BIKE_POINTS = [
  { id: 'BikePoints_454', name: 'Napier Avenue, Millwall' },
  { id: 'BikePoints_481', name: 'Saunders Ness Road, Cubitt Town' },
];

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

export async function fetchBikePoints() {
  const results = await Promise.all(
    BIKE_POINTS.map(async ({ id, name }) => {
      const res = await fetch(`${BASE_URL}/BikePoint/${id}`);
      if (!res.ok) throw new Error(`TfL API error: ${res.status}`);
      const data = await res.json();
      const prop = (key) =>
        data.additionalProperties.find((p) => p.key === key)?.value;
      return {
        id,
        name,
        standardBikes: Number(prop('NbStandardBikes')),
        emptyDocks: Number(prop('NbEmptyDocks')),
      };
    })
  );
  return results;
}
