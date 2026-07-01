import FieldLabel from '../FieldLabel/FieldLabel.jsx';
import styles from './Textarea.module.css';

export default function Textarea({
  label, required, placeholder, value, onChange, rows = 4, error, hint,
  dir = 'rtl', className = '', style = {},
}) {
  return (
    <div className={`${styles.field} ${className}`} style={style}>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        dir={dir}
        className={`${styles.textarea} ${error ? styles.error : ''}`}
      />
      {(error || hint) && (
        <span className={`${styles.hint} ${error ? styles.error : ''}`} dir={dir}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
