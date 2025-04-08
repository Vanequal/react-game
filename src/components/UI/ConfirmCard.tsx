import React from 'react';
import { useTranslation } from 'react-i18next';
import DLCBadge from './DLCBadge';
import ActivationTimer from './ActivationTimer';
import DLCImg from '../../assets/DLC-img.jpeg';
import styles from '../../styles/ConfirmCard.module.scss';

interface ConfirmCardProps {
  gameTitle: string;
  orderNumber: string;
  timerTime: string;
}

const ConfirmCard: React.FC<ConfirmCardProps> = ({ gameTitle, orderNumber }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.confirmCard}>
      <div className={styles.imageContainer}>
        <img src={DLCImg} alt="DLC" />
      </div>
      
      <h1 className={styles.cardTitle}>
        <p>{gameTitle}</p>
      </h1>
      
      <div className={styles.orderInfo}>
        <span className={styles.orderNumber}>
          <p>{orderNumber}</p>
        </span>
        <DLCBadge />
        <ActivationTimer />
      </div>
      
      <div className={styles.footerText}>
        <p dangerouslySetInnerHTML={{ __html: t('activationInfo', {
            defaultValue: 'Для активации DLC нужна <br /> основная игра на аккаунте.'
          }) }} />
      </div>
    </div>
  );
};

export default ConfirmCard;
