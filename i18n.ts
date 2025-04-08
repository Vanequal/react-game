import i18next, { i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ru: {
    translation: {
      successfulPurchase: 'Удачная покупка!',
      timeLeft: 'Осталось:',
      thankYou: 'Спасибо за покупку товара в нашем магазине! <br /> Будем рады Вашему отзыву, обращайтесь ещё!',
      leaveReview: 'Оставить отзыв',
      main: 'Главная',
      viewEdition: 'Посмотреть версию издания',
      viewGame: 'Посмотреть игру',
      order: 'Заказ #',
      close: 'Закрыть',
      animationFormText: "У нас раздачи игр! Подпишись",

      headerText: "Для активации DLC нужна <br /> основная игра на аккаунте",
      gameTitle: "Command & Conquer™ Red Alert™ 3- Uprising",
      orderNumber: "Заказ #{{number}}",
      checkProfile: "Проверка профиля",
      steamNickname: "Steam никнейм покупателя. Проверьте перед покупкой!",
      changeAccount: "Сменить аккаунт",
      thisIsMyAccount: "Это мой аккаунт",
      min: "мин",
      sec: "с",
      enterSteamProfileLink: "Введите ссылку на ваш профиль Steam",
      logo: "Логотип",
      avatar: "Аватар",
      viewGameEdition: 'Посмотреть версию издания',
      activationInfo: 'Для активации DLC нужна <br /> основная игра на аккаунте',
      activationTime: "Время на активацию {{time}}",

      friendRequest: " Вам отправлен запрос на добавление друзья в Steam. Вам необходимо принять нашего бота с никнеймом “Bot Name” в друзья. Далее вам отправят купленный товар.",
      addFriend: "Добавить в друзья",
      waitingForInvitation: "Ожидание приглашения...",
      enterNewSteamProfileLink: "Введите новую ссылку на профиль Steam",
      friendRequestMessage: 'Вам отправлен запрос на добавление друзей в <br /> Steam. Вам необходимо принять нашего бота с <br /> никнеймом "Bot Name" в друзья. Далее вам <br /> отправят купленный товар.',
      contactSeller: 'Связаться с продавцем'
    }
  },
  en: {
    translation: {
      successfulPurchase: 'Successful purchase!',
      timeLeft: 'Time left:',
      thankYou: 'Thank you for your purchase in our store! <br /> We would appreciate your feedback, please contact us again!',
      leaveReview: 'Leave a review',
      main: 'Main',
      viewGameEdition: 'View edition version',
      viewGame: 'View game',
      order: 'Order #',
      close: 'Close',

      headerText: "The base game is required on your account to activate DLC",
      gameTitle: "Command & Conquer™ Red Alert™ 3- Uprising",
      orderNumber: "Order #{{number}}",
      checkProfile: "Profile verification",
      steamNickname: "Buyer's Steam nickname. Please check before purchase!",
      changeAccount: "Change account",
      thisIsMyAccount: "This is my account",
      min: "min",
      sec: "sec",
      enterSteamProfileLink: "Enter your Steam profile link",
      logo: "Logo",
      avatar: "Avatar",
      activationInfo: 'You need the main game <br /> on your account  to activate the DLC',
      activationTime: "Activation time {{time}}",

      friendRequest: " You have been sent a request to add friends in Steam. You need to accept our bot with the nickname “Bot Name” as a friend. Then you will be sent the purchased item.",
      friendRequestMessage: 'You received a friend request in <br /> Steam. You need to accept our bot with <br /> nickname "Bot Name" to your friends list. Then you <br /> will receive your purchased item.',
      addFriend: "Add friend",
      waitingForInvitation: "Waiting for invitation...",
      enterNewSteamProfileLink: "Enter new Steam profile link",
      contactSeller: 'Contact the Seller',
      animationFormText: "We give away games! Subscribe"
    }
  }
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

const i18n: I18nInstance = i18next;

export default i18n;
