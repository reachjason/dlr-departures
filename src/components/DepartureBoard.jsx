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

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th>Destination</th>
            <th>Platform</th>
            <th>Current Location</th>
            <th>Departs</th>
          </tr>
        </thead>
        <tbody>
          {departures.map((d, i) => (
            <DepartureRow key={d.id} departure={d} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
