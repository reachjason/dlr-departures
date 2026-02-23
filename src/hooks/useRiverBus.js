import { useState, useEffect, useCallback } from 'react';
import { fetchRiverBus } from '../services/tflApi';

const REFRESH_INTERVAL = 30; // seconds

export function useRiverBus() {
  const [riverBus, setRiverBus] = useState([]);
  const [riverBusLoading, setRiverBusLoading] = useState(true);
  const [riverBusError, setRiverBusError] = useState(null);

  const load = useCallback(async () => {
    setRiverBusError(null);
    try {
      const data = await fetchRiverBus();
      setRiverBus(data);
    } catch (err) {
      setRiverBusError(err.message);
    } finally {
      setRiverBusLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, REFRESH_INTERVAL * 1000);
    return () => clearInterval(interval);
  }, [load]);

  return { riverBus, riverBusLoading, riverBusError };
}
