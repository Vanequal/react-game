import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/TelegramAnimation.module.scss";
import telegramIcon from "../../assets/telegram-icon.svg";
import animationForm from "../../assets/telegram-form-animation.webp";

interface TelegramAnimationProps {
  telegramLink?: string;
}

const TelegramAnimation = ({ telegramLink = "https://t.me/your_telegram" }: TelegramAnimationProps) => {
  const [showForm, setShowForm] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setRotationDirection(1);
      setIsRotating(true);
      
      setTimeout(() => {
        setShowForm(true);
      }, 100);
      
      setTimeout(() => {
        setShowForm(false);
        
        setTimeout(() => {
          setRotationDirection(-1);
          
          setTimeout(() => {
            setIsRotating(false);
          }, 500);
        }, 100);
      }, 4000);
    }, 10000);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className={styles.telegramContainer}>
      <motion.a 
        href={telegramLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.telegram}
        animate={{ 
          rotate: isRotating ? (rotationDirection > 0 ? 360 : 0) : 0,
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        <img src={telegramIcon} alt="Telegram" />
      </motion.a>
      
      <AnimatePresence>
        {showForm && (
          <motion.div 
            className={`${styles.animationFormContainer} ${isMobile ? styles.mobileForm : ''}`}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut" 
            }}
          >
            <img src={animationForm} alt="Telegram Form" className={styles.animationFormImage} />
            <div className={styles.animationFormText}>
              У нас раздачи игр! Подпишись
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TelegramAnimation;