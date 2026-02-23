import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchDepartures } from '../services/tflApi';

const REFRESH_INTERVAL = 30; // seconds

export function useDepartures() {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const countdownRef = useRef(null);
  const fetchRef = useRef(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchDepartures();
      setDepartures(data);
      setLastUpdated(new Date());
      setCountdown(REFRESH_INTERVAL);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + polling
  useEffect(() => {
    load();

    fetchRef.current = setInterval(load, REFRESH_INTERVAL * 1000);

    return () => clearInterval(fetchRef.current);
  }, [load]);

  // Countdown timer
  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdownRef.current);
  }, []);

  const refresh = useCallback(() => {
    clearInterval(fetchRef.current);
    setLoading(true);
    load().then(() => {
      fetchRef.current = setInterval(load, REFRESH_INTERVAL * 1000);
    });
  }, [load]);

  return { departures, loading, error, lastUpdated, countdown, refresh };
}
