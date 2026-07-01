import FieldLabel from '../FieldLabel/FieldLabel.jsx';
import styles from './Input.module.css';

export default function Input({
  label, required, placeholder, value, onChange, error, dir = 'rtl',
  leadingIcon, disabled, className = '', style = {}, ...rest
}) {
  const wrapClasses = [styles.wrap, error && styles.error, disabled && styles.disabled].filter(Boolean).join(' ');
  return (
    <div className={`${styles.field} ${className}`} style={style}>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <div className={wrapClasses} style={{ direction: dir }}>
        {leadingIcon}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          dir={dir}
          className={styles.input}
          {...rest}
        />
      </div>
      {error && <span className={styles.errorText} dir={dir}>{error}</span>}
    </div>
  );
}
