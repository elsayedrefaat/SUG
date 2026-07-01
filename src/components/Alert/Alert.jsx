import Icon from '../Icon/Icon.jsx';
import styles from './Alert.module.css';

const ICON_BY_VARIANT = { success: 'check', error: 'refresh', warning: 'clock', info: 'clock' };

export default function Alert({
  variant = 'info', title, children, action, onClose, dir = 'rtl', className = '', style = {},
}) {
  const tone = styles[variant] || styles.info;
  return (
    <div className={`${styles.alert} ${tone} ${className}`} style={{ direction: dir, ...style }}>
      <span className={styles.icon}><Icon name={ICON_BY_VARIANT[variant] || 'clock'} size={20} /></span>
      <div className={styles.body}>
        {title && <div className={`${styles.title} ${children ? styles.withBody : ''}`}>{title}</div>}
        {children && <div className={styles.message}>{children}</div>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="إغلاق" className={styles.closeBtn}>
          <Icon name="close" size={18} />
        </button>
      )}
    </div>
  );
}
