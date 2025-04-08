import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/ProfileCheckCard.module.scss';
import Button from './Button';
import ButtonInline from './ButtonInline';
import TelegramAnimation from './TelegramAnimation';
import defaultAvatar from '../../assets/avatar.png';

interface ProfileCheckCardProps {
  headerText: string;
  profileUrl: string;
  buttoninlinetext: string;
  buttonMainText: string;
  showMainButton?: boolean;
  friendRequestMessage?: boolean | string;
  avatarSrc?: string;
  steamNickname: string;
  showSellerLink?: boolean;
  showGame?: boolean;
  showGameEdition?: boolean;
  showClose?: boolean;
  onMainButtonClick?: () => void;
  onInlineButtonClick?: () => void; 
}

const ProfileCheckCard: React.FC<ProfileCheckCardProps> = ({
  headerText,
  profileUrl,
  buttoninlinetext,
  buttonMainText,
  showMainButton = true,
  friendRequestMessage = false,
  avatarSrc,
  steamNickname,
  showSellerLink = false,
  showGame = false,
  showGameEdition = false,
  showClose = false,
  onMainButtonClick,
  onInlineButtonClick,
}) => {
  const { t, i18n } = useTranslation();

  let messageHtml = '';
  if (friendRequestMessage === true) {
    messageHtml = t('friendRequestMessage', {
      defaultValue: 'Вам отправлен запрос на добавление друзей в <br /> Steam. Вам необходимо принять нашего бота с <br /> никнеймом “Bot Name” в друзья. Далее вам <br /> отправят купленный товар.'
    });
  } else if (typeof friendRequestMessage === 'string') {
    messageHtml = friendRequestMessage;
  }

  return (
    <div className={styles.profileCheckCard}>
      <h1 className={styles.header}>{headerText}</h1>
      <div className={styles.avatarWrapper}>
        <img src={avatarSrc || defaultAvatar} alt="Avatar" className={styles.avatar} />
      </div>
      <div className={styles.profileText}>
        <p dangerouslySetInnerHTML={{ __html: steamNickname }} />
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">
          {profileUrl}
        </a>
        {messageHtml && <p dangerouslySetInnerHTML={{ __html: messageHtml }} />}
      </div>
      <div className={styles.buttons}>
        {showMainButton && (
          <Button onClick={onMainButtonClick}>
            {buttonMainText}
          </Button>
        )}
        <ButtonInline onClick={onInlineButtonClick}>
          {buttoninlinetext}
        </ButtonInline>
        {showSellerLink && (
          <a href="#" style={{ color: 'white' }}>
            {t('contactSeller', { defaultValue: 'Связаться с продавцом' })}
          </a>
        )}
        {showGameEdition && (
          <a href="#" style={{ color: 'white' }}>
            {t('viewGameEdition', { defaultValue: 'Посмотреть версию издания' })}
          </a>
        )}
        {showGame && (
          <a href="#" style={{ color: 'white' }}>
            {t('viewGame', { defaultValue: 'Посмотреть игру' })}
          </a>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.langContainer}>
          <span
            className={`${styles.lang} ${i18n.language.toLowerCase().startsWith('ru') ? styles.active : ''}`}
            onClick={() => i18n.changeLanguage('ru')}
          >
            RU
          </span>
          <span
            className={`${styles.lang} ${i18n.language.toLowerCase().startsWith('en') ? styles.active : ''}`}
            onClick={() => i18n.changeLanguage('en')}
          >
            ENG
          </span>
        </div>
        <div className={styles.telegramAnimation}>
          <TelegramAnimation />
        </div>
      </div>
      {showClose && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <a
            href="#"
            style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>{t('close', { defaultValue: 'Закрыть' })}</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileCheckCard;
