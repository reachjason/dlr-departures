import { useDepartures } from './hooks/useDepartures';
import { DepartureBoard } from './components/DepartureBoard';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { StatusBar } from './components/StatusBar';
import styles from './App.module.css';

export default function App() {
  const { departures, loading, error, lastUpdated, countdown, refresh } =
    useDepartures();

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
