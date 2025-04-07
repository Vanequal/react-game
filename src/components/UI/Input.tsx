import styles from "../../styles/Input.module.scss";

interface InputProps {
  placeholder: string;
  type?: "text" | "password" | "email";
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, type = "text", className, value, onChange }) => {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      className={`${styles.input} ${className}`} 
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;