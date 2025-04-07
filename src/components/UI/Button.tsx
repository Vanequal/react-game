import styles from "../../styles/Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button", className }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;