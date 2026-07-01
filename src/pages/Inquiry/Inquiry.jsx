import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Card from '../../components/Card/Card.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import Skeleton from '../../components/Skeleton/Skeleton.jsx';
import Alert from '../../components/Alert/Alert.jsx';
import SubmissionRow from '../../components/SubmissionRow/SubmissionRow.jsx';
import { MOCK_SUBMISSIONS } from '../../data/mockSubmissions.js';
import styles from './Inquiry.module.css';

export default function Inquiry() {
  const location = useLocation();
  const prefill = location.state?.prefill || '';

  const [nid, setNid] = useState('');
  const [track, setTrack] = useState(prefill);
  const [err, setErr] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | loading | result | empty | neterr
  const [list, setList] = useState([]);

  function search() {
    const v = nid.trim();
    if (!/^\d{14}$/.test(v)) { setErr('الرقم القومي يجب أن يكون 14 رقمًا.'); return; }
    setErr('');
    setPhase('loading');
    setTimeout(() => {
      if (v.startsWith('9999')) { setPhase('neterr'); return; }
      if (v === '00000000000000') { setList([]); setPhase('empty'); return; }
      const t = track.trim().toUpperCase();
      if (t) {
        const found = MOCK_SUBMISSIONS.filter((s) => s.id.toUpperCase() === t);
        setList(found); setPhase(found.length ? 'result' : 'empty'); return;
      }
      setList(MOCK_SUBMISSIONS); setPhase('result');
    }, 1300);
  }

  return (
    <section className={styles.section}>
      <Breadcrumb items={['الاستعلام']} />
      <h1 className={styles.title}>الاستعلام عن حالة الطلب</h1>
      <p className={styles.desc}>أدخل رقمك القومي لعرض جميع طلباتك، أو أضف رقم المتابعة للوصول إلى طلب محدد.</p>

      <Card padding={24} className={styles.searchCard}>
        <div className={styles.field}>
          <Input
            label="الرقم القومي" required value={nid}
            onChange={(e) => { setNid(e.target.value.replace(/\D/g, '').slice(0, 14)); if (err) setErr(''); }}
            placeholder="14 رقمًا" error={err} inputMode="numeric"
            onKeyDown={(e) => { if (e.key === 'Enter') search(); }}
          />
        </div>
        <div className={styles.field}>
          <Input
            label="رقم المتابعة (اختياري)" value={track} onChange={(e) => setTrack(e.target.value)}
            placeholder="مثال: C-2025-445566" onKeyDown={(e) => { if (e.key === 'Enter') search(); }}
          />
        </div>
        <Button variant="primary" size="md" loading={phase === 'loading'} onClick={search} className={styles.searchBtn}>بحث</Button>
      </Card>

      <div className={styles.results}>
        {phase === 'idle' && (
          <Card tone="mist" padding={40} className={styles.stateCard}>
            <span className={styles.stateIcon}><Icon name="search" size={30} /></span>
            <div className={styles.stateText}>أدخل رقمك القومي ثم اضغط على "بحث".</div>
          </Card>
        )}

        {phase === 'loading' && (
          <div className={styles.loadingList}>
            {[0, 1, 2].map((i) => (
              <Card key={i} padding={20} className={styles.loadingRow}>
                <Skeleton w={44} h={44} r={12} />
                <div className={styles.loadingText}><Skeleton w="60%" h={16} /><Skeleton w={110} h={12} /></div>
                <Skeleton w={90} h={26} r={999} />
              </Card>
            ))}
          </div>
        )}

        {phase === 'empty' && (
          <Card padding={40} className={styles.stateCard}>
            <span className={`${styles.stateIcon} ${styles.empty}`}><Icon name="search" size={34} /></span>
            <h3 className={styles.emptyTitle}>لا توجد طلبات مسجّلة</h3>
            <p className={styles.emptyDesc}>لم نعثر على أي شكاوى أو طلبات أو اقتراحات مرتبطة بهذا الرقم القومي.</p>
            <Button variant="primary" onClick={() => setPhase('idle')}>بحث مرة أخرى</Button>
          </Card>
        )}

        {phase === 'neterr' && (
          <Alert
            variant="error" title="تعذر الاتصال بالخادم"
            action={<Button variant="dark" size="sm" onClick={search} leftIcon={<Icon name="refresh" size={16} />}>إعادة المحاولة</Button>}
          >
            يرجى التحقق من اتصالك بالإنترنت ثم إعادة المحاولة.
          </Alert>
        )}

        {phase === 'result' && (
          <div>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>طلباتك <span className={styles.resultsCount}>({list.length} نتيجة)</span></h2>
              <span className={styles.resultsNid}>الرقم القومي: {nid}</span>
            </div>
            <div className={styles.resultsList}>
              {list.map((item) => <SubmissionRow key={item.id} item={item} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
