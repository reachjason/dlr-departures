import styles from './LoadingSkeleton.module.css';

function SkeletonRow() {
  return (
    <tr className={styles.row}>
      <td><div className={`${styles.bone} ${styles.long}`} /></td>
      <td><div className={`${styles.bone} ${styles.short}`} /></td>
      <td><div className={`${styles.bone} ${styles.medium}`} /></td>
      <td><div className={`${styles.bone} ${styles.short}`} /></td>
    </tr>
  );
}

export function LoadingSkeleton() {
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
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
