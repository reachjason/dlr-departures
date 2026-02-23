import styles from './BikePointPanel.module.css';

export function BikePointPanel({ bikePoints, bikeLoading, bikeError }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Santander Cycles</h2>
      {bikeError ? (
        <p className={styles.error}>Could not load bike availability</p>
      ) : bikeLoading ? (
        <div className={styles.cards}>
          <div className={styles.cardSkeleton} />
          <div className={styles.cardSkeleton} />
        </div>
      ) : (
        <div className={styles.cards}>
          {bikePoints.map((point) => (
            <div key={point.id} className={styles.card}>
              <p className={styles.cardName}>{point.name}</p>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{point.standardBikes}</span>
                  <span className={styles.statLabel}>bikes</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.stat}>
                  <span className={styles.statValue}>{point.emptyDocks}</span>
                  <span className={styles.statLabel}>free docks</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
