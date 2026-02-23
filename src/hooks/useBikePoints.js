import { useState, useEffect, useCallback } from 'react';
import { fetchBikePoints } from '../services/tflApi';

const REFRESH_INTERVAL = 30; // seconds

export function useBikePoints() {
  const [bikePoints, setBikePoints] = useState([]);
  const [bikeLoading, setBikeLoading] = useState(true);
  const [bikeError, setBikeError] = useState(null);

  const load = useCallback(async () => {
    setBikeError(null);
    try {
      const data = await fetchBikePoints();
      setBikePoints(data);
    } catch (err) {
      setBikeError(err.message);
    } finally {
      setBikeLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, REFRESH_INTERVAL * 1000);
    return () => clearInterval(interval);
  }, [load]);

  return { bikePoints, bikeLoading, bikeError };
}
