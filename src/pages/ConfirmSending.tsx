import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GameSession } from '../api/api';
import { useTranslation } from 'react-i18next';
import ConfirmCard from '../components/UI/ConfirmCard';
import ProfileCheckCard from '../components/UI/ProfileCheckCard';
import Button from '../components/UI/Button';
import ButtonInline from '../components/UI/ButtonInline';
import TelegramAnimation from '../components/UI/TelegramAnimation';
import logo from '../assets/logo-main.svg';
import desktopBackground from '../assets/DLC-background.png';
import mobileBackground from '../assets/DLC-background-mobile.png';
import gift from '../assets/gift.png';
import giftAvatar from '../assets/gift-avatar.png';
import styles from '../styles/CheckCode.module.scss';

const ConfirmSending: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [lang, setLang] = useState<'RU' | 'ENG'>(i18n.language === 'en' ? 'ENG' : 'RU');
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const navigate = useNavigate();
  const location = useLocation();
  const session: GameSession | undefined = location.state?.session;

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (!session) {
    navigate("/");
    return null;
  }

  useEffect(() => {
    if (session?.sessionEndTime) {
      const endTime = new Date(session.sessionEndTime).getTime();
      const interval = setInterval(() => {
        const now = Date.now();
        const secs = Math.max(Math.floor((endTime - now) / 1000), 0);
        setSecondsRemaining(secs);
        if (secs === 0) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [session?.sessionEndTime]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLanguageChange = (language: 'RU' | 'ENG') => {
    setLang(language);
    i18n.changeLanguage(language === 'RU' ? 'ru' : 'en');
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      className={styles.confirmSendingPage}
      style={{ backgroundImage: `url(${isMobile ? mobileBackground : desktopBackground})` }}
    >
      {isMobile ? (
        <>
          <div className={styles.mobileHeader}>
            <div className={styles.headerLeft}>
              <img src={logo} alt="Логотип" />
            </div>
            <div className={styles.headerRight}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className={styles.mobileContent}>
            <div className={styles.avatarWrapper}>
              <img src={gift} alt="Gift" className={styles.avatar} />
              <img src={giftAvatar} alt="Gift Avatar" className={styles.giftAvatarOverlay} />
            </div>
            <div className={styles.title}>
              <h1 style={{ color: '#0DC11F' }}>{t('successfulPurchase')}</h1>
            </div>
            <div className={styles.orderInfo}>
              <p dangerouslySetInnerHTML={{ __html: t('thankYou') }} />
            </div>
            <div className={styles.buttons}>
              <Button>{t('leaveReview')}</Button>
              <ButtonInline onClick={handleGoHome}>{t('main')}</ButtonInline>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
                {t('viewGameEdition')}
              </a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
                {t('viewGame')}
              </a>
            </div>
          </div>
          <div className={styles.mobileFooter}>
            <div className={styles.langContainer}>
              <span
                className={`${styles.lang} ${lang === 'RU' ? styles.active : ''}`}
                onClick={() => handleLanguageChange('RU')}
              >
                RU
              </span>
              <span
                className={`${styles.lang} ${lang === 'ENG' ? styles.active : ''}`}
                onClick={() => handleLanguageChange('ENG')}
              >
                EN
              </span>
            </div>
            <div className={styles.telegramAnimation}>
              <TelegramAnimation telegramLink="https://t.me/your_telegram" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.logo}>
            <img src={logo} alt="Логотип" />
          </div>
          <div className={styles.cardsContainer}>
            <ConfirmCard
              gameTitle="Command & Conquer™ Red Alert™ 3- Uprising"
              orderNumber={`${t('order')}99999999`}
              timerTime={formatTime(secondsRemaining)}
            />
            <ProfileCheckCard
              headerText={t('successfulPurchase')}
              profileUrl=""
              buttoninlinetext={t('main')}
              showMainButton={true}
              friendRequestMessage={false}
              showGame={true}
              showGameEdition={true}
              avatarSrc={gift}
              buttonMainText={t('leaveReview')}
              steamNickname={t('thankYou')}
              showClose={true}
              onMainButtonClick={handleGoHome}
              onInlineButtonClick={() => window.close()}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmSending;
