import { useState, useEffect, useCallback } from 'react';
import { fetchSunTimes, fetchTideTimes } from '../services/sunTideApi';

const REFRESH_INTERVAL = 30; // seconds

export function useSunTide() {
  const [sunTide, setSunTide] = useState({ sun: null, tide: null });
  const [sunTideLoading, setSunTideLoading] = useState(true);
  const [sunTideError, setSunTideError] = useState(null);

  const load = useCallback(async () => {
    setSunTideError(null);
    try {
      const [sun, tide] = await Promise.all([fetchSunTimes(), fetchTideTimes()]);
      setSunTide({ sun, tide });
    } catch (err) {
      setSunTideError(err.message);
    } finally {
      setSunTideLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, REFRESH_INTERVAL * 1000);
    return () => clearInterval(interval);
  }, [load]);

  return { sunTide, sunTideLoading, sunTideError };
}
