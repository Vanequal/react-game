import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmSteamAccount, GameSession } from '../api/api';
import ConfirmCard from '../components/UI/ConfirmCard';
import ProfileCheckCard from '../components/UI/ProfileCheckCard';
import Button from '../components/UI/Button';
import ButtonInline from '../components/UI/ButtonInline';
import TelegramAnimation from '../components/UI/TelegramAnimation';
import DLCBadge from '../components/UI/DLCBadge';
import ActivationTimer from '../components/UI/ActivationTimer';
import logo from '../assets/logo-main.svg';
import desktopBackground from '../assets/DLC-background.png';
import mobileBackground from '../assets/DLC-background-mobile.png';
import avatar from '../assets/avatar.png';
import styles from '../styles/ConfirmSending.module.scss';

const translations = {
  RU: {
    headerText: "Для активации DLC нужна основная игра на аккаунте",
    gameTitle: "Command & Conquer™ Red Alert™ 3- Uprising",
    orderNumber: "Заказ #99999999",
    checkProfile: "Проверка профиля",
    steamNickname: "Steam никнейм покупателя. Проверьте перед покупкой!",
    changeAccount: "Сменить аккаунт",
    thisIsMyAccount: "Это мой аккаунт",
    min: "мин",
    sec: "с"
  },
  ENG: {
    headerText: "The base game is required on your account to activate DLC",
    gameTitle: "Command & Conquer™ Red Alert™ 3- Uprising",
    orderNumber: "Order #99999999",
    checkProfile: "Profile verification",
    steamNickname: "Buyer's Steam nickname. Please check before purchase!",
    changeAccount: "Change account",
    thisIsMyAccount: "This is my account",
    min: "min",
    sec: "sec"
  }
};

const SteamContact: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [lang, setLang] = useState<'RU' | 'ENG'>('RU');
  const navigate = useNavigate();
  const location = useLocation();
  const session: GameSession | undefined = location.state?.session;

  const t = translations[lang];

  const [steamUrl, setSteamUrl] = useState(session?.steamProfileUrl || '');


  const [secondsLeft, setSecondsLeft] = useState(119);
  

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
    if (secondsLeft <= 0) {
      navigate("/"); 
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft, navigate]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const buttonText = `${t.thisIsMyAccount} ${minutes} ${t.min} ${seconds < 10 ? `0${seconds}` : seconds} ${t.sec}`;

  const handleConfirm = async () => {
    const updatedSession = await confirmSteamAccount({ ...session, steamProfileUrl: steamUrl });
    navigate("/checkcode", { state: { session: updatedSession, language: lang } });
  };
  
  const handleChangeAccount = () => {
    const newUrl = prompt("Введите ссылку на ваш профиль Steam", steamUrl);
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
              <img src={avatar} alt="Avatar" className={styles.avatar} />
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
              </p>
            </div>
            <div className={styles.buttons}>
              <Button onClick={handleConfirm}>{buttonText}</Button>
              <ButtonInline onClick={handleChangeAccount}>{t.changeAccount}</ButtonInline>
            </div>
          </div>
          <div className={styles.mobileFooter}>
            <div className={styles.langContainer}>
              <span className={`${styles.lang} ${lang === 'RU' ? styles.active : ''}`}
                    onClick={() => changeLang('RU')}>RU</span>
              <span className={`${styles.lang} ${lang === 'ENG' ? styles.active : ''}`}
                    onClick={() => changeLang('ENG')}>ENG</span>
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
              showMainButton={true}
              friendRequestMessage={false}
              showSellerLink={false}
              buttonMainText={buttonText}
              steamNickname={`${t.steamNickname} <br /> <br />`}
              showClose={false}
              onMainButtonClick={handleConfirm}
              onInlineButtonClick={handleChangeAccount} 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SteamContact;