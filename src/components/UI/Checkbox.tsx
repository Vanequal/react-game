import styles from "../../styles/Checkbox.module.scss";
import { useState } from "react";

interface CheckboxProps {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <label className={styles.checkbox}>
      <input 
        type="checkbox" 
        checked={checked}
        onChange={handleChange}
        required
      />
      <span className={`${styles.checkmark} ${checked ? styles.checked : ''}`}></span>
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Checkbox;