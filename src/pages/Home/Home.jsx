import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import Button from '../../components/Button/Button.jsx';
import { FORMS } from '../../data/forms.js';
import styles from './Home.module.css';

const CARDS = [
  { ...FORMS.complaint, path: '/complaint' },
  { ...FORMS.request, path: '/request' },
  { ...FORMS.suggestion, path: '/suggestion' },
  { key: 'inquiry', path: '/inquiry', icon: 'search', accent: 'var(--foe-navy)', home: { title: 'الاستعلام', desc: 'اعرض جميع طلباتك وشكاويك بالرقم القومي.' } },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>منصة الشكاوى والطلبات والاقتراحات</h1>
        <p className={styles.heroDesc}>
          يمكنك من خلال هذه المنصة تقديم شكوى أو طلب أو اقتراح، ومتابعة جميع طلباتك وحالتها باستخدام رقمك القومي.
        </p>
      </section>
      <section className={styles.cardsSection}>
        <div className={styles.grid}>
          {CARDS.map((c) => (
            <Card key={c.key} padding={26} className={styles.card}>
              <span className={styles.iconWrap} style={{ background: c.accent }}>
                <Icon name={c.icon} size={28} />
              </span>
              <h3 className={styles.cardTitle}>{c.home.title}</h3>
              <p className={styles.cardDesc}>{c.home.desc}</p>
              <Button
                variant={c.key === 'inquiry' ? 'dark' : 'primary'}
                fullWidth
                onClick={() => navigate(c.path)}
                rightIcon={<Icon name="back" size={18} />}
              >
                {c.key === 'inquiry' ? 'استعلام' : c.home.title}
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
