import styles from './StatusBar.module.css';

function formatTime(date) {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function StatusBar({ lastUpdated, countdown, onRefresh, loading }) {
  return (
    <div className={styles.bar}>
      <span className={styles.updated}>
        {lastUpdated ? `Updated at ${formatTime(lastUpdated)}` : 'Loading…'}
      </span>
      <div className={styles.right}>
        {!loading && (
          <span className={styles.countdown}>
            Refreshing in {countdown}s
          </span>
        )}
        <button
          className={styles.refreshBtn}
          onClick={onRefresh}
          disabled={loading}
          aria-label="Refresh departures"
        >
          {loading ? '…' : '↻'}
        </button>
      </div>
    </div>
  );
}
