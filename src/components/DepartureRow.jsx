import styles from './DepartureRow.module.css';

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

export function DepartureRow({ departure, index }) {
  const mins = formatTime(departure.timeToStation);
  const urgency = getUrgencyClass(departure.timeToStation);

  return (
    <tr className={`${styles.row} ${index % 2 === 0 ? styles.even : ''}`}>
      <td className={styles.destination}>{departure.destination}</td>
      <td className={styles.platform}>{departure.platform || '—'}</td>
      <td className={styles.location}>{departure.currentLocation || '—'}</td>
      <td className={`${styles.time} ${urgency}`}>{mins}</td>
    </tr>
  );
}
