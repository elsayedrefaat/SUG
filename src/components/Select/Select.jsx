import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import FieldLabel from '../FieldLabel/FieldLabel.jsx';
import styles from './Select.module.css';

export default function Select({
  label, required, value, onChange, options = [], placeholder = 'اختر',
  error, dir = 'rtl', className = '', style = {},
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`${styles.field} ${className}`} style={{ ...style, direction: dir }}>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${styles.trigger} ${value ? styles.hasValue : ''} ${error ? styles.error : ''}`}
      >
        <span>{value || placeholder}</span>
        <Icon name="chevron" size={18} color="rgb(111,111,111)" style={{ transition: 'transform .15s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      {open && (
        <div className={`${styles.menu} ${label ? styles.withLabel : styles.noLabel}`}>
          {options.map((o) => (
            <div
              key={o}
              onClick={() => { onChange && onChange(o); setOpen(false); }}
              className={`${styles.option} ${o === value ? styles.selected : ''}`}
            >
              {o}
            </div>
          ))}
        </div>
      )}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
