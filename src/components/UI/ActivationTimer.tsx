import React, { useState, useEffect } from 'react';
import styles from '../../styles/ActivationTimer.module.scss';
import { useTranslation } from 'react-i18next';

const ActivationTimer: React.FC = () => {
  const { t } = useTranslation();
  const TIMER_DURATION = 24 * 3600 * 1000;

  const getStartTime = (): number => {
    const stored = sessionStorage.getItem("activationTimerStart");
    if (stored) {
      return parseInt(stored, 10);
    } else {
      const now = Date.now();
      sessionStorage.setItem("activationTimerStart", now.toString());
      return now;
    }
  };

  const [startTime] = useState<number>(getStartTime());
  const endTime = startTime + TIMER_DURATION;

  const [remainingTime, setRemainingTime] = useState<number>(
    Math.max(Math.floor((endTime - Date.now()) / 1000), 0)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const secondsLeft = Math.max(Math.floor((endTime - now) / 1000), 0);
      setRemainingTime(secondsLeft);
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.activationTimer}>
      <span>{t('activationTime', { time: formatTime(remainingTime) })}</span>
      <div className={styles.badgeIcon}>?</div>
    </div>
  );
};

export default ActivationTimer;
