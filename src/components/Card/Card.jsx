import styles from './Card.module.css';

export default function Card({
  children, padding = 24, radius = 16, tone = 'light', className = '', style = {}, ...rest
}) {
  const classes = [styles.card, styles[tone] || styles.light, className].filter(Boolean).join(' ');
  return (
    <div className={classes} style={{ borderRadius: radius, padding, ...style }} {...rest}>
      {children}
    </div>
  );
}
