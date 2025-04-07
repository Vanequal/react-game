import React from 'react';
import DLCBadge from './DLCBadge';
import ActivationTimer from './ActivationTimer';
import DLCImg from '../../assets/DLC-img.jpeg';
import styles from '../../styles/ConfirmCard.module.scss';

interface ConfirmCardProps {
  gameTitle: string;
  orderNumber: string;
  timerTime: string;
}

const ConfirmCard: React.FC<ConfirmCardProps> = ({ gameTitle, orderNumber}) => {
  return (
    <div className={styles.confirmCard}>
      <div className={styles.imageContainer}>
        <img src={DLCImg} alt="DLC" />
      </div>
      
      <h1 className={styles.cardTitle}>
        <p>{gameTitle}</p>
      </h1>
      
      <div className={styles.orderInfo}>
        <span className={styles.orderNumber}><p>{orderNumber}</p></span>
        <DLCBadge />
        {/* Убираем передачу свойства time */}
        <ActivationTimer />
      </div>
      
      <div className={styles.footerText}>
        <p>Для активации DLC нужна <br /> основная игра на аккаунте.</p>
      </div>
    </div>
  );
};

export default ConfirmCard;
