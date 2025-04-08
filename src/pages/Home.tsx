import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUniqueCode, GameSession } from '../api/api';
import styles from "../styles/Home.module.scss";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import Checkbox from "../components/UI/Checkbox";
import TelegramAnimation from "../components/UI/TelegramAnimation";
import logo from "../assets/logo-main.svg";
import background from "../assets/main-background.webp";

const translations = {
  RU: {
    title: "Введите уникальный код заказа",
    inputPlaceholder: "Введите уникальный код",
    confirmButton: "Подтвердить",
    notRobot: "Я не робот",
    contact: "Связаться с продавцом",
  },
  ENG: {
    title: "Enter the unique order code",
    inputPlaceholder: "Enter unique code",
    confirmButton: "Confirm",
    notRobot: "I am not a robot",
    contact: "Contact the seller",
  }
};

const Home = () => {
  const [lang, setLang] = useState<"RU" | "ENG">("RU");
  const [isMobile, setIsMobile] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const t = translations[lang];

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleConfirm = async () => {
    try {
      setError(null);
      const session: GameSession = await checkUniqueCode(code.trim());
      navigate("/steamcontact", { state: { session } });
    } catch (err: any) {
      const errorMsg = lang === "RU" ? err.message : 
        (err.message === "Неверный код" ? "Invalid code" : err.message);
      setError(errorMsg);
    }
  };
  
  const changeLang = (newLang: "RU" | "ENG") => {
    setLang(newLang);
  };

  return (
    <div className={styles.home} style={{ backgroundImage: `url(${background})` }}>
      {error && (
        <div 
          style={{
            background: 'rgba(23, 8, 8, 1)',       
            border: '2px solid rgba(234, 36, 36, 1)', 
            color: 'rgba(234, 36, 36, 1)',             
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '4px',
            whiteSpace: 'pre-line',
          }}
        >
          {error}
        </div>
      )}
      
      <div className={styles.headerLogo}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      {!isMobile ? (
        <div className={styles.card}>
          <h1>{t.title}</h1>
          <Input 
            placeholder={t.inputPlaceholder} 
            value={code}
            error={!!error} // Передаём флаг ошибки
            onChange={(e) => setCode(e.target.value)}
          />
          <Button onClick={handleConfirm}>{t.confirmButton}</Button>
          <div className={styles.checkboxContainer}>
            <Checkbox label={t.notRobot} error={!!error} />
          </div>
          <p className={styles.contact}>{t.contact}</p>
          <div className={styles.footer}>
            <div className={styles.langContainer}>
              <span className={`${styles.lang} ${lang === "RU" ? styles.active : ""}`}
                    onClick={() => changeLang("RU")}>RU</span>
              <span className={`${styles.lang} ${lang === "ENG" ? styles.active : ""}`}
                    onClick={() => changeLang("ENG")}>ENG</span>
            </div>
            <TelegramAnimation telegramLink="https://t.me/your_telegram" />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.mobileContent}>
            <h1 dangerouslySetInnerHTML={{ __html: t.title }} />
            <div className={styles.mobileInput}>
              <Input 
                placeholder={t.inputPlaceholder} 
                className="w-full" 
                value={code}
                error={!!error}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className={styles.mobileButton}>
              <Button onClick={handleConfirm}>{t.confirmButton}</Button>
            </div>
            <div className={styles.mobileCheckbox}>
              <Checkbox label={t.notRobot} error={!!error} />
            </div>
            <p className={styles.contact}>{t.contact}</p>
          </div>
          <div className={styles.mobileFooter}>
            <div className={styles.langContainer}>
              <span className={`${styles.lang} ${lang === "RU" ? styles.active : ""}`}
                    onClick={() => changeLang("RU")}>RU</span>
              <span className={`${styles.lang} ${lang === "ENG" ? styles.active : ""}`}
                    onClick={() => changeLang("ENG")}>EN</span>
            </div>
            <div className={styles.telegramIcon}>
              <TelegramAnimation telegramLink="https://t.me/your_telegram" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
