import styles from './RiverBusPanel.module.css';

function formatTime(seconds) {
  if (seconds < 60) return 'Due';
  const mins = Math.floor(seconds / 60);
  return `${mins} min`;
}

function getUrgencyClass(seconds) {
  if (seconds < 60) return styles.due;
  if (seconds < 180) return styles.soon;
  return '';
}

export function RiverBusPanel({ riverBus, riverBusLoading, riverBusError }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Uber Boat — Masthouse Terrace Pier</h2>
      {riverBusError ? (
        <p className={styles.error}>Could not load river bus departures</p>
      ) : riverBusLoading ? (
        <div className={styles.skeleton} />
      ) : riverBus.length === 0 ? (
        <div className={styles.skeleton} style={{ animation: 'none', opacity: 1 }}>
          <p className={styles.empty}>No upcoming departures</p>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Route</th>
              <th>Departs</th>
            </tr>
          </thead>
          <tbody>
            {riverBus.map((departure, index) => (
              <tr
                key={departure.id}
                className={`${styles.row} ${index % 2 === 0 ? styles.even : ''}`}
              >
                <td className={styles.destination}>{departure.destination}</td>
                <td className={styles.line}>{departure.line}</td>
                <td className={`${styles.time} ${getUrgencyClass(departure.timeToStation)}`}>
                  {formatTime(departure.timeToStation)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
