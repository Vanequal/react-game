export type LanguageType = "RU" | "ENG";

export const commonTranslations = {
  RU: {
    orderPrefix: "Заказ #",
    changeAccount: "Сменить аккаунт",
    mainPage: "Главная",
    activationRequired: "Для активации DLC нужна основная игра на аккаунте",
    steamNicknameCheck: "Steam никнейм покупателя. Проверьте перед покупкой!",
    viewGameVersion: "Посмотреть версию издания",
    viewGame: "Посмотреть игру",
    contactSeller: "Связаться с продавцом",
    iAmNotRobot: "Я не робот",
  },
  ENG: {
    orderPrefix: "Order #",
    changeAccount: "Change account",
    mainPage: "Main page",
    activationRequired: "Base game is required for DLC activation",
    steamNicknameCheck: "Steam nickname of the buyer. Check before purchase!",
    viewGameVersion: "View edition version",
    viewGame: "View game",
    contactSeller: "Contact seller",
    iAmNotRobot: "I am not a robot",
  }
};

export const steamContactTranslations = {
  RU: {
    headerText: "Проверка профиля",
    buttonMainTextPrefix: "Это мой аккаунт",
    min: "мин",
    sec: "с",
  },
  ENG: {
    headerText: "Profile verification",
    buttonMainTextPrefix: "This is my account",
    min: "min",
    sec: "sec",
  }
};

export const checkCodeTranslations = {
  RU: {
    profileCheck: "Проверка профиля",
    inviteWaiting: "Ожидание приглашения...",
    addFriend: "Добавить в друзья",
    botMessage: "Вам отправлен запрос на добавление в друзья. Примите нашего бота с никнеймом \"Bot Name\".",
  },
  ENG: {
    profileCheck: "Profile verification",
    inviteWaiting: "Waiting for invitation...",
    addFriend: "Add friend",
    botMessage: "You have received a friend request. Please accept our bot with the nickname \"Bot Name\".",
  }
};

export const confirmSendingTranslations = {
  RU: {
    successTitle: "Удачная покупка!",
    thankYouMessage: "Спасибо за покупку товара в нашем магазине! Будем рады Вашему отзыву, обращайтесь ещё!",
    leaveReview: "Оставить отзыв",
  },
  ENG: {
    successTitle: "Successful purchase!",
    thankYouMessage: "Thank you for purchasing in our store! We would appreciate your review, please come again!",
    leaveReview: "Leave a review",
  }
};

export const saveLang = (lang: LanguageType) => {
    localStorage.setItem("preferredLanguage", lang);
  };
  
  export const loadSavedLang = (): LanguageType => {
    const savedLang = localStorage.getItem("preferredLanguage") as LanguageType | null;
    return (savedLang && (savedLang === "RU" || savedLang === "ENG")) ? savedLang : "RU";
  };
  