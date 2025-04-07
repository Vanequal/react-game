import React from 'react';
import styles from '../../styles/DLCBadge.module.scss';

const DLCBadge: React.FC = () => {
  return (
    <div className={styles.dlcBadge}>
      <span className={styles.badgeText}>DLC</span>
      <div className={styles.badgeIcon}>?</div>
    </div>
  );
};

export default DLCBadge;
