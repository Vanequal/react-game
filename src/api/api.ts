// api/api.ts

// Интерфейс, описывающий данные сессии, строго типизированный под данные бэкенда
export interface GameSession {
    uniqueCode: string;
    statusId: number; // 1 – код найден, 2 – подтверждение Steam, 3 – добавление в друзья, 4 – подтверждение отправки
    steamProfileUrl?: string;
    createdAt: string;      // ISO-строка, например, "2025-04-07T12:00:00Z"
    sessionEndTime?: string; // ISO-строка для таймера (время окончания подтверждения отправки)
  }
  
  // Имитация проверки уникального кода
  export const checkUniqueCode = (uniqueCode: string): Promise<GameSession> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (uniqueCode.trim() === '1234') {
          resolve({
            uniqueCode,
            statusId: 1,
            steamProfileUrl: 'https://steamcommunity.com/profiles/чей то стим',
            createdAt: new Date().toISOString(),
          });
        } else {
          reject(new Error('Уникальный код не найден'));
        }
      }, 500);
    });
  };

  
  
  
  // Имитация подтверждения того, что аккаунт Steam принадлежит пользователю
  export const confirmSteamAccount = (session: GameSession): Promise<GameSession> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...session,
          statusId: 2,
        });
      }, 500);
    });
  };
  
  // Имитация ожидания приглашения в друзья (например, с задержкой в 3 секунды)
  export const waitForFriendInvitation = (session: GameSession): Promise<GameSession> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...session,
          statusId: 3,
        });
      }, 3000);
    });
  };
  
  // Имитация старта страницы подтверждения отправки с установкой таймера (60 секунд)
  export const startConfirmSendingTimer = (session: GameSession): Promise<GameSession> => {
    return new Promise((resolve) => {
      const endTime = new Date(Date.now() + 60000).toISOString(); // текущее время + 60 сек.
      resolve({
        ...session,
        statusId: 4,
        sessionEndTime: endTime,
      });
    });
  };
  