import { useDepartures } from './hooks/useDepartures';
import { useBikePoints } from './hooks/useBikePoints';
import { useRiverBus } from './hooks/useRiverBus';
import { DepartureBoard } from './components/DepartureBoard';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { StatusBar } from './components/StatusBar';
import { BikePointPanel } from './components/BikePointPanel';
import { RiverBusPanel } from './components/RiverBusPanel';
import styles from './App.module.css';

export default function App() {
  const { departures, loading, error, lastUpdated, countdown, refresh } =
    useDepartures();
  const { bikePoints, bikeLoading, bikeError } = useBikePoints();
  const { riverBus, riverBusLoading, riverBusError } = useRiverBus();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.badge}>DLR</div>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Island Gardens</h1>
          <p className={styles.subtitle}>Live Departures</p>
        </div>
      </header>

      <main className={styles.main}>
        {error ? (
          <div className={styles.error}>
            <p>Could not load departures: {error}</p>
            <button className={styles.retryBtn} onClick={refresh}>
              Try again
            </button>
          </div>
        ) : loading && departures.length === 0 ? (
          <LoadingSkeleton />
        ) : (
          <DepartureBoard departures={departures} />
        )}

        <RiverBusPanel
          riverBus={riverBus}
          riverBusLoading={riverBusLoading}
          riverBusError={riverBusError}
        />

        <BikePointPanel
          bikePoints={bikePoints}
          bikeLoading={bikeLoading}
          bikeError={bikeError}
        />

        <StatusBar
          lastUpdated={lastUpdated}
          countdown={countdown}
          onRefresh={refresh}
          loading={loading}
        />
      </main>
    </div>
  );
}
