import styles from './StatusBadge.module.css';

const STATUS_CLASS = {
  'جديد': 'new',
  'قيد الفحص': 'reviewing',
  'تم الرد': 'answered',
  'مغلق': 'closed',
};

export default function StatusBadge({ status }) {
  const cls = styles[STATUS_CLASS[status] || 'new'];
  return (
    <span className={`${styles.badge} ${cls}`}>
      <span className={styles.dot} />
      {status}
    </span>
  );
}
