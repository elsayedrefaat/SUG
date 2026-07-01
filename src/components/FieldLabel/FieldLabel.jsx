import styles from './FieldLabel.module.css';

export default function FieldLabel({ children, required }) {
  return (
    <span className={styles.label}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </span>
  );
}
