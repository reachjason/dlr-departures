const SUN_API_URL =
  'https://api.sunrise-sunset.org/json?lat=51.49&lng=-0.02&date=today&formatted=0&tzid=Europe/London';

const TIDE_API_URL =
  'https://environment.data.gov.uk/flood-monitoring/id/stations/0001/readings?today';

function formatTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

export async function fetchSunTimes() {
  const res = await fetch(SUN_API_URL);
  if (!res.ok) throw new Error('Failed to fetch sunrise/sunset data');
  const data = await res.json();
  if (data.status !== 'OK') throw new Error('Sunrise API error');
  return {
    sunrise: formatTime(data.results.sunrise),
    sunset: formatTime(data.results.sunset),
  };
}

export async function fetchTideTimes() {
  const res = await fetch(TIDE_API_URL);
  if (!res.ok) throw new Error('Failed to fetch tide data');
  const data = await res.json();

  const readings = (data.items || [])
    .map((r) => ({ time: new Date(r.dateTime), level: r.value }))
    .sort((a, b) => a.time - b.time);

  if (readings.length < 3) return { high: [], low: [] };

  const highs = [];
  const lows = [];

  for (let i = 1; i < readings.length - 1; i++) {
    const prev = readings[i - 1].level;
    const curr = readings[i].level;
    const next = readings[i + 1].level;

    if (curr > prev && curr > next) {
      highs.push(readings[i]);
    } else if (curr < prev && curr < next) {
      lows.push(readings[i]);
    }
  }

  // Filter out noise: only keep peaks/troughs with >= 0.3m change from nearest opposite
  const filtered = { high: filterSignificant(highs, lows), low: filterSignificant(lows, highs) };

  return {
    high: filtered.high.map(formatTide),
    low: filtered.low.map(formatTide),
  };
}

function filterSignificant(candidates, opposites) {
  if (opposites.length === 0) return candidates;
  return candidates.filter((c) => {
    const nearest = opposites.reduce((best, o) =>
      Math.abs(o.time - c.time) < Math.abs(best.time - c.time) ? o : best
    );
    return Math.abs(c.level - nearest.level) >= 0.3;
  });
}

function formatTide(reading) {
  return {
    time: formatTime(reading.time.toISOString()),
    level: reading.level.toFixed(1),
  };
}
