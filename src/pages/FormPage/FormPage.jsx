import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Card from '../../components/Card/Card.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import Button from '../../components/Button/Button.jsx';
import Alert from '../../components/Alert/Alert.jsx';
import Select from '../../components/Select/Select.jsx';
import Input from '../../components/Input/Input.jsx';
import Textarea from '../../components/Textarea/Textarea.jsx';
import Upload from '../../components/Upload/Upload.jsx';
import { FORMS, PREFIX, refNumber } from '../../data/forms.js';
import styles from './FormPage.module.css';

export default function FormPage({ type }) {
  const cfg = FORMS[type];
  const navigate = useNavigate();

  const [cat, setCat] = useState('');
  const [nid, setNid] = useState('');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [uploadErr, setUploadErr] = useState('');
  const [phase, setPhase] = useState('form'); // form | submitting | success | error
  const [ref, setRef] = useState('');
  const [copied, setCopied] = useState(false);

  function validate() {
    const e = {};
    if (!cat) e.cat = 'هذا الحقل مطلوب.';
    if (!nid.trim()) e.nid = 'هذا الحقل مطلوب.';
    else if (!/^\d{14}$/.test(nid.trim())) e.nid = 'الرقم القومي يجب أن يكون 14 رقمًا.';
    if (!title.trim()) e.title = 'هذا الحقل مطلوب.';
    if (!detail.trim()) e.detail = 'هذا الحقل مطلوب.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit() {
    if (!validate()) return;
    setPhase('submitting');
    setTimeout(() => {
      // 12% simulated failure to show error state
      if (Math.random() < 0.12) { setPhase('error'); return; }
      setRef(refNumber(PREFIX[cfg.key])); setPhase('success');
    }, 1400);
  }

  function copyRef() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    try { navigator.clipboard.writeText(ref); } catch (_) {}
  }

  if (phase === 'success') {
    return (
      <section className={styles.successWrap}>
        <Card padding={40} className={styles.successCard}>
          <span className={styles.successIcon}><Icon name="check" size={44} stroke={2.4} /></span>
          <h2 className={styles.successTitle}>{cfg.successTitle}</h2>
          <p className={styles.successMsg}>{cfg.successMsg}</p>
          <div className={styles.refBox}>
            <div className={styles.refLabel}>رقم المتابعة</div>
            <div className={styles.refRow}>
              <span className={styles.refValue}>{ref}</span>
              <Button variant="outline" size="sm" onClick={copyRef} leftIcon={<Icon name={copied ? 'check' : 'copy'} size={16} />}>
                {copied ? 'تم النسخ' : 'نسخ'}
              </Button>
            </div>
          </div>
          <div className={styles.successActions}>
            <Button variant="primary" onClick={() => navigate('/')} leftIcon={<Icon name="home" size={18} />}>العودة للرئيسية</Button>
            <Button variant="ghost" onClick={() => navigate('/inquiry', { state: { prefill: ref } })}>الاستعلام عن الحالة</Button>
          </div>
        </Card>
      </section>
    );
  }

  const busy = phase === 'submitting';
  return (
    <section className={styles.section}>
      <Breadcrumb items={[cfg.home.title]} />
      <div className={styles.heading}>
        <span className={styles.iconWrap} style={{ background: cfg.accent }}><Icon name={cfg.icon} size={26} /></span>
        <h1 className={styles.title}>{cfg.home.title}</h1>
      </div>

      {phase === 'error' && (
        <Alert
          variant="error" title="حدث خطأ غير متوقع" className={styles.alertSpacing}
          action={<Button variant="dark" size="sm" onClick={submit} leftIcon={<Icon name="refresh" size={16} />}>إعادة المحاولة</Button>}
        >
          تعذّر إرسال {cfg.kind}. يرجى إعادة المحاولة.
        </Alert>
      )}
      {uploadErr && <Alert variant="warning" onClose={() => setUploadErr('')} className={styles.alertSpacing}>{uploadErr}</Alert>}

      <Card padding={28} className={styles.form}>
        <Select label={cfg.catLabel} required value={cat} onChange={(v) => { setCat(v); setErrors((e) => ({ ...e, cat: undefined })); }} options={cfg.categories} error={errors.cat} />
        <Input label="الرقم القومي" required value={nid} onChange={(e) => { setNid(e.target.value.replace(/\D/g, '').slice(0, 14)); setErrors((x) => ({ ...x, nid: undefined })); }} placeholder="أدخل رقمك القومي (14 رقمًا)" inputMode="numeric" error={errors.nid} />
        <Input label={cfg.titleLabel} required value={title} onChange={(e) => { setTitle(e.target.value); setErrors((x) => ({ ...x, title: undefined })); }} placeholder={`اكتب ${cfg.titleLabel} باختصار`} error={errors.title} />
        <Textarea label={cfg.detailLabel} required rows={5} value={detail} onChange={(e) => { setDetail(e.target.value); setErrors((x) => ({ ...x, detail: undefined })); }} placeholder="اشرح التفاصيل بوضوح…" error={errors.detail} />
        <Textarea label="ملاحظات إضافية (اختياري)" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="أي ملاحظات إضافية…" />
        <div>
          <div className={styles.attachmentsLabel}>المرفقات</div>
          <Upload files={files} onChange={setFiles} onError={setUploadErr} maxFiles={5} maxSizeMB={10} />
          <div className={styles.attachmentsHint}>الصيغ المدعومة: PDF, DOC, DOCX, JPG, PNG.</div>
        </div>
      </Card>

      <div className={styles.submitBar}>
        <Button variant="primary" size="lg" loading={busy} onClick={submit}>{busy ? 'جارٍ الإرسال…' : cfg.submit}</Button>
      </div>
    </section>
  );
}
