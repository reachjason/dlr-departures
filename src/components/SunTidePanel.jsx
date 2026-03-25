import styles from './SunTidePanel.module.css';

export function SunTidePanel({ sunTide, sunTideLoading, sunTideError }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Sun &amp; Tide</h2>
      {sunTideError ? (
        <p className={styles.error}>Could not load sun/tide data</p>
      ) : sunTideLoading ? (
        <div className={styles.cards}>
          <div className={styles.cardSkeleton} />
          <div className={styles.cardSkeleton} />
        </div>
      ) : (
        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.cardName}>Sun</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>
                  <span className={styles.arrow}>{'\u2600\uFE0F'}</span> {sunTide.sun.sunrise}
                </span>
                <span className={styles.statLabel}>sunrise</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>
                  <span className={styles.arrow}>{'\uD83C\uDF19'}</span> {sunTide.sun.sunset}
                </span>
                <span className={styles.statLabel}>sunset</span>
              </div>
            </div>
          </div>

          <div className={styles.cardWide}>
            <p className={styles.cardName}>Thames Tide</p>
            {sunTide.tide.high.length === 0 && sunTide.tide.low.length === 0 ? (
              <p className={styles.noData}>No data yet</p>
            ) : (
              <div className={styles.tideList}>
                {sunTide.tide.high.map((t, i) => (
                  <div key={`h${i}`} className={styles.tideRow}>
                    <span className={styles.tideLabel}>High</span>
                    <span className={styles.tideTime}>{t.time}</span>
                    <span className={styles.tideLevel}>{t.level}m</span>
                  </div>
                ))}
                {sunTide.tide.low.map((t, i) => (
                  <div key={`l${i}`} className={styles.tideRow}>
                    <span className={styles.tideLabel}>Low</span>
                    <span className={styles.tideTime}>{t.time}</span>
                    <span className={styles.tideLevel}>{t.level}m</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
