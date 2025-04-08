import styles from "../../styles/Input.module.scss";

interface InputProps {
  placeholder: string;
  type?: "text" | "password" | "email";
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean; 
}

const Input: React.FC<InputProps> = ({ placeholder, type = "text", className, value, onChange, error = false }) => {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      className={`${styles.input} ${className ? className : ''} ${error ? styles.error : ''}`} 
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
