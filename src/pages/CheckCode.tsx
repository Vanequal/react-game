import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { waitForFriendInvitation, startConfirmSendingTimer, GameSession } from '../api/api';
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

const translations = {
  RU: {
    headerText: "Для активации DLC нужна основная игра на аккаунте",
    gameTitle: "Command & Conquer™ Red Alert™ 3- Uprising",
    orderNumber: "Заказ #99999999",
    checkProfile: "Проверка профиля",
    steamNickname: "Steam никнейм покупателя. Проверьте перед покупкой!",
    changeAccount: "Сменить аккаунт",
    friendRequest: "Вам отправлен запрос на добавление в друзья. Примите нашего бота с никнеймом \"Bot Name\".",
    addFriend: "Добавить в друзья",
    waitingForInvitation: "Ожидание приглашения..."
  },
  ENG: {
    headerText: "The base game is required on your account to activate DLC",
    gameTitle: "Command & Conquer™ Red Alert™ 3- Uprising",
    orderNumber: "Order #99999999",
    checkProfile: "Profile verification",
    steamNickname: "Buyer's Steam nickname. Please check before purchase!",
    changeAccount: "Change account",
    friendRequest: "You have received a friend request. Please accept our bot with nickname \"Bot Name\".",
    addFriend: "Add friend",
    waitingForInvitation: "Waiting for invitation..."
  }
};

const CheckCode: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [lang, setLang] = useState<'RU' | 'ENG'>('RU');
  const [inviteReady, setInviteReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const session: GameSession | undefined = location.state?.session;

  const t = translations[lang];

  const [steamUrl, setSteamUrl] = useState(session?.steamProfileUrl || '');

  const changeLang = (newLang: "RU" | "ENG") => {
    setLang(newLang);
  };

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
    navigate("/confirmsending", { state: { session: updatedSession } });
  };

  const handleChangeAccount = () => {
    const newUrl = prompt("Введите новую ссылку на профиль Steam", steamUrl);
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
              <img src={logo} alt="Логотип" />
            </div>
            <div className={styles.headerCenter}>
              <p>{t.headerText}</p>
            </div>
          </div>
          <div className={styles.mobileContent}>
            <div className={styles.avatarWrapper}>
              <img src={avatar2} alt="Avatar" className={styles.avatar} />
            </div>
            <div className={styles.badgeTimerRow}>
              <DLCBadge />
              <ActivationTimer initialTime={60} />
            </div>
            <div className={styles.title}>
              <p>{t.gameTitle}</p>
            </div>
            <div className={styles.orderInfo}>
              <p>{t.orderNumber}</p>
              <p>
                {t.steamNickname}
                <br />
                <a href={steamUrl} target="_blank" rel="noopener noreferrer">
                  {steamUrl}
                </a>
                &nbsp; {t.friendRequest}
              </p>
            </div>
            <div className={styles.buttons}>
              <ButtonInline onClick={handleAcceptInvite} disabled={!inviteReady}>
                {inviteReady ? t.addFriend : t.waitingForInvitation}
              </ButtonInline>
              <ButtonInline onClick={handleChangeAccount}>{t.changeAccount}</ButtonInline>
            </div>
          </div>
          <div className={styles.mobileFooter}>
            <div className={styles.langContainer}>
              <span className={`${styles.lang} ${lang === 'RU' ? styles.active : ''}`} onClick={() => changeLang('RU')}>RU</span>
              <span className={`${styles.lang} ${lang === 'ENG' ? styles.active : ''}`} onClick={() => changeLang('ENG')}>ENG</span>
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
              gameTitle={t.gameTitle}
              orderNumber={t.orderNumber}
              timerTime="00:00:00"
            />
            <ProfileCheckCard
              headerText={t.checkProfile}
              profileUrl={steamUrl} 
              buttoninlinetext={t.changeAccount}
              showMainButton={false}
              friendRequestMessage={true}
              showSellerLink={true}
              avatarSrc={avatar2}
              buttonMainText=""  
              steamNickname={`${t.steamNickname} <br /> <br />`}
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