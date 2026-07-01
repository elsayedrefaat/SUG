import { Link } from 'react-router-dom';
import foeLogo from '../../assets/foe-logo.png';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <img src={foeLogo} alt="جهاز مستقبل مصر" className={styles.logo} />
        <span className={styles.title}>منصة الشكاوى والطلبات</span>
      </Link>
    </header>
  );
}
