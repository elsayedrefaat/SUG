import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon.jsx';
import styles from './Breadcrumb.module.css';

export default function Breadcrumb({ items }) {
  return (
    <div className={styles.breadcrumb}>
      <Link to="/" className={styles.home}>الرئيسية</Link>
      {items.map((it, i) => (
        <span key={i} className={styles.crumb}>
          <Icon name="back" size={14} color="var(--foe-slate)" />
          <span>{it}</span>
        </span>
      ))}
    </div>
  );
}
