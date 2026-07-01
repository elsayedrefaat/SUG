import styles from './Button.module.css';

export default function Button({
  children, variant = 'primary', size = 'md', leftIcon, rightIcon,
  loading = false, disabled = false, fullWidth = false, className = '', style = {}, ...rest
}) {
  const off = disabled || loading;
  const classes = [
    styles.button,
    styles[size],
    styles[variant],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type="button" disabled={off} className={classes} style={style} {...rest}>
      {loading && <span className={styles.spinner} />}
      {!loading && leftIcon}
      {children != null && <span>{children}</span>}
      {!loading && rightIcon}
    </button>
  );
}
