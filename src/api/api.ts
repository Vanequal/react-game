
export interface GameSession {
    uniqueCode: string;
    statusId: number;
    steamProfileUrl?: string;
    createdAt: string;   
    sessionEndTime?: string; 
  }
  
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
          reject(new Error('Некорректный код заказа. \nПроверьте код ещё раз.'));
        }
      }, 500);
    });
  };

  
  
  
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
  