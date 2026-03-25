import { DepartureRow } from './DepartureRow';
import styles from './DepartureBoard.module.css';

export function DepartureBoard({ departures }) {
  if (departures.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No departures found at this time.</p>
      </div>
    );
  }

  const hasLocation = departures.some((d) => d.currentLocation);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th>Destination</th>
            <th>Platform</th>
            {hasLocation && <th>Current Location</th>}
            <th>Departs</th>
          </tr>
        </thead>
        <tbody>
          {departures.map((d, i) => (
            <DepartureRow key={d.id} departure={d} index={i} showLocation={hasLocation} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
