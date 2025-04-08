import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { waitForFriendInvitation, startConfirmSendingTimer, GameSession } from '../api/api';
import { useTranslation } from 'react-i18next';
import ConfirmCard from '../components/UI/ConfirmCard';
import ProfileCheckCard from '../components/UI/ProfileCheckCard';
import ButtonInline from '../components/UI/ButtonInline';
import TelegramAnimation from '../components/UI/TelegramAnimation';
import DLCBadge from '../components/UI/DLCBadge';
import ActivationTimer from '../components/UI/ActivationTimer';
import logo from '../assets/logo-main.svg';
import desktopBackground from '../assets/DLC-background.png';
import mobileBackground from '../assets/DLC-background-mobile.png';
import avatar2 from '../assets/avatar-2.png';
import styles from '../styles/ConfirmSending.module.scss';

const CheckCode: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [inviteReady, setInviteReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const session: GameSession | undefined = location.state?.session;
  const { t, i18n } = useTranslation();

  const [steamUrl, setSteamUrl] = useState(session?.steamProfileUrl || '');

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
    const timer = setTimeout(() => setInviteReady(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inviteReady) {
      handleAcceptInvite();
    }
  }, [inviteReady]);

  const handleAcceptInvite = async () => {
    let updatedSession = await waitForFriendInvitation(session);
    updatedSession = await startConfirmSendingTimer(updatedSession);
    navigate("/confirmsending", { state: { session: updatedSession, language: i18n.language } });
  };

  const handleChangeAccount = () => {
    const newUrl = prompt(t('enterNewSteamProfileLink'), steamUrl);
    if (newUrl) {
      setSteamUrl(newUrl.trim());
    }
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
              <img src={logo} alt={t('logo')} />
            </div>
            <div className={styles.headerCenter}>
            <p dangerouslySetInnerHTML={{ __html: t('headerText') }} />
            </div>
          </div>
          <div className={styles.mobileContent}>
            <div className={styles.avatarWrapper}>
              <img src={avatar2} alt={t('avatar')} className={styles.avatar} />
            </div>
            <div className={styles.badgeTimerRow}>
              <DLCBadge />
              <ActivationTimer />
            </div>
            <div className={styles.title}>
              <h3 style={{fontWeight: '500'}}>{t('gameTitle')}</h3>
            </div>
            <br />
            <div className={styles.orderInfo}>
              <h3 style={{fontWeight: '500'}}>{t('orderNumber', { number: '99999999' })}</h3>
              <br />
              <p style={{fontWeight: '400', fontSize: '14px'}}>
                {t('steamNickname')}
                <br />
                <a href={steamUrl} target="_blank" rel="noopener noreferrer">
                  {steamUrl}
                </a>
                &nbsp; {t('friendRequest')}
              </p>
            </div>
            <div className={styles.buttons}>
              <ButtonInline onClick={handleChangeAccount}>{t('changeAccount')}</ButtonInline>
            </div>
          </div>
          <div className={styles.mobileFooter}>
            <div className={styles.langContainer}>
              <span className={`${styles.lang} ${i18n.language === 'ru' ? styles.active : ''}`} onClick={() => i18n.changeLanguage('ru')}>RU</span>
              <span className={`${styles.lang} ${i18n.language === 'en' ? styles.active : ''}`} onClick={() => i18n.changeLanguage('en')}>ENG</span>
            </div>
            <div className={styles.telegramAnimation}>
              <TelegramAnimation telegramLink="https://t.me/your_telegram" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.logo}>
            <img src={logo} alt={t('logo')} />
          </div>
          <div className={styles.cardsContainer}>
            <ConfirmCard
              gameTitle={t('gameTitle')}
              orderNumber={t('orderNumber', { number: '99999999' })}
              timerTime="00:00:00"
            />
            <ProfileCheckCard
              headerText={t('checkProfile')}
              profileUrl={steamUrl} 
              buttoninlinetext={t('changeAccount')}
              showMainButton={false}
              friendRequestMessage={true} // This will use the friendRequestMessage translation from i18n
              showSellerLink={true}
              avatarSrc={avatar2}
              buttonMainText=""  
              steamNickname={`${t('steamNickname')} <br /> <br />`}
              showClose={false}
              onMainButtonClick={handleAcceptInvite}
              onInlineButtonClick={handleChangeAccount}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CheckCode;