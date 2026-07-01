import React from 'react';
import {
  Icon, Button, Card, Input, Textarea, Select, StatusBadge, Alert, Skeleton,
  FileUpload, AppHeader, AppFooter,
} from './components/Kit.jsx';

/* FOE Complaints Platform — screens & router. */

const FORMS = {
  complaint: {
    key: 'complaint', kind: 'شكوى', icon: 'complaint', accent: 'var(--foe-teal)',
    home: { title: 'تقديم شكوى', desc: 'سجّل شكواك وتابع مراجعتها من الجهة المختصة.' },
    catLabel: 'تصنيف الشكوى', titleLabel: 'عنوان الشكوى', detailLabel: 'تفاصيل الشكوى',
    submit: 'إرسال الشكوى', successTitle: 'تم إرسال الشكوى بنجاح', successMsg: 'تم استلام الشكوى وسيتم مراجعتها.',
    categories: ['طلب تخصيص', 'طلب تقنين', 'طلب رفع مساحي', 'طلب تسجيل قيد موردين', 'أخرى'],
  },
  request: {
    key: 'request', kind: 'طلب', icon: 'request', accent: 'var(--foe-gold-deep)',
    home: { title: 'تقديم طلب', desc: 'قدّم طلبك الرسمي إلى الجهاز وتابع حالته.' },
    catLabel: 'تصنيف الطلب', titleLabel: 'عنوان الطلب', detailLabel: 'تفاصيل الطلب',
    submit: 'إرسال الطلب', successTitle: 'تم إرسال الطلب بنجاح', successMsg: 'تم استلام الطلب وسيتم مراجعته.',
    categories: ['أراضي', 'منافذ', 'موارد بشرية', 'أراضي زراعية', 'شؤون قانونية', 'شؤون مالية', 'أخرى'],
  },
  suggestion: {
    key: 'suggestion', kind: 'اقتراح', icon: 'suggestion', accent: 'var(--foe-success)',
    home: { title: 'تقديم اقتراح', desc: 'شاركنا فكرتك للمساهمة في تطوير مشروعات الجهاز.' },
    catLabel: 'تصنيف الاقتراح', titleLabel: 'عنوان الاقتراح', detailLabel: 'تفاصيل الاقتراح',
    submit: 'إرسال الاقتراح', successTitle: 'تم إرسال الاقتراح بنجاح', successMsg: 'شكراً لمساهمتك، تم استلام اقتراحك.',
    categories: ['زراعي', 'استثماري', 'صناعي', 'أخرى'],
  },
};

function refNumber(prefix) {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-2025-${n}`;
}
const PREFIX = { complaint: 'C', request: 'R', suggestion: 'S' };

/* ---------------------------------------------------------------- Page shell */
function Page({ children, onHome }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--foe-paper)' }}>
      <AppHeader onHome={onHome} />
      <main style={{ flex: 1 }}>{children}</main>
      <AppFooter />
    </div>
  );
}
function Breadcrumb({ items, onHome }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, direction: 'rtl', fontFamily: 'var(--font-primary)', fontSize: 14, color: 'var(--foe-ink-500)', marginBottom: 20 }}>
      <span onClick={onHome} style={{ cursor: 'pointer', color: 'var(--foe-gold-deep)' }}>الرئيسية</span>
      {items.map((it, i) => (
        <React.Fragment key={i}><Icon name="back" size={14} color="var(--foe-slate)" /><span>{it}</span></React.Fragment>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- Home */
function Home({ go }) {
  const cards = [
    { ...FORMS.complaint }, { ...FORMS.request }, { ...FORMS.suggestion },
    { key: 'inquiry', icon: 'search', accent: 'var(--foe-navy)', home: { title: 'الاستعلام', desc: 'اعرض جميع طلباتك وشكاويك بالرقم القومي.' } },
  ];
  return (
    <Page onHome={() => go('home')}>
      <section style={{ direction: 'rtl', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,80px)', textAlign: 'center', background: 'linear-gradient(180deg,#fff, var(--foe-mist))' }}>
        <h1 style={{ margin: '0 0 14px', fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 'clamp(28px,4vw,40px)', color: 'var(--foe-ink-800)' }}>منصة الشكاوى والطلبات والاقتراحات</h1>
        <p style={{ margin: '0 auto', maxWidth: 680, fontFamily: 'var(--font-primary)', fontSize: 18, lineHeight: 1.8, color: 'var(--foe-ink-500)' }}>
          يمكنك من خلال هذه المنصة تقديم شكوى أو طلب أو اقتراح، ومتابعة جميع طلباتك وحالتها باستخدام رقمك القومي.
        </p>
      </section>
      <section style={{ direction: 'rtl', padding: '0 clamp(20px,5vw,80px) 56px', marginTop: -28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24, maxWidth: 1120, margin: '0 auto' }}>
          {cards.map((c) => (
            <Card key={c.key} padding={26} style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'right' }}>
              <span style={{ width: 56, height: 56, borderRadius: 14, background: c.accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Icon name={c.icon} size={28} /></span>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 21, color: 'var(--foe-ink-800)' }}>{c.home.title}</h3>
              <p style={{ margin: 0, flex: 1, fontFamily: 'var(--font-primary)', fontSize: 15, lineHeight: 1.7, color: 'var(--foe-ink-500)' }}>{c.home.desc}</p>
              <Button variant={c.key === 'inquiry' ? 'dark' : 'primary'} fullWidth onClick={() => go(c.key)} rightIcon={<Icon name="back" size={18} />}>
                {c.key === 'inquiry' ? 'استعلام' : c.home.title}
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </Page>
  );
}

/* ---------------------------------------------------------------- Form screen */
function FormScreen({ cfg, go }) {
  const [cat, setCat] = React.useState('');
  const [nid, setNid] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [detail, setDetail] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [files, setFiles] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const [uploadErr, setUploadErr] = React.useState('');
  const [phase, setPhase] = React.useState('form'); // form | submitting | success | error
  const [ref, setRef] = React.useState('');
  const [copied, setCopied] = React.useState(false);

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
  function copyRef() { setCopied(true); setTimeout(() => setCopied(false), 1800); try { navigator.clipboard.writeText(ref); } catch (_) {} }

  if (phase === 'success') {
    return (
      <Page onHome={() => go('home')}>
        <section style={{ direction: 'rtl', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,80px)', display: 'flex', justifyContent: 'center' }}>
          <Card padding={40} style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
            <span style={{ width: 88, height: 88, borderRadius: '50%', background: 'rgba(23,178,106,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foe-success)', margin: '0 auto 20px' }}>
              <Icon name="check" size={44} stroke={2.4} />
            </span>
            <h2 style={{ margin: '0 0 8px', fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 26, color: 'var(--foe-ink-800)' }}>{cfg.successTitle}</h2>
            <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-primary)', fontSize: 16, color: 'var(--foe-ink-500)' }}>{cfg.successMsg}</p>
            <div style={{ background: 'var(--foe-mist)', borderRadius: 12, padding: '18px 20px', marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-primary)', fontSize: 14, color: 'var(--foe-ink-500)', marginBottom: 6 }}>رقم المتابعة</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 24, letterSpacing: 1, color: 'var(--foe-ink-800)' }}>{ref}</span>
                <Button variant="outline" size="sm" onClick={copyRef} leftIcon={<Icon name={copied ? 'check' : 'copy'} size={16} />}>{copied ? 'تم النسخ' : 'نسخ'}</Button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={() => go('home')} leftIcon={<Icon name="home" size={18} />}>العودة للرئيسية</Button>
              <Button variant="ghost" onClick={() => go('inquiry', { prefill: ref })}>الاستعلام عن الحالة</Button>
            </div>
          </Card>
        </section>
      </Page>
    );
  }

  const busy = phase === 'submitting';
  return (
    <Page onHome={() => go('home')}>
      <section style={{ direction: 'rtl', padding: 'clamp(28px,4vw,48px) clamp(20px,5vw,80px)', maxWidth: 760, margin: '0 auto' }}>
        <Breadcrumb items={[cfg.home.title]} onHome={() => go('home')} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <span style={{ width: 48, height: 48, borderRadius: 12, background: cfg.accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Icon name={cfg.icon} size={26} /></span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 28, color: 'var(--foe-ink-800)' }}>{cfg.home.title}</h1>
        </div>

        {phase === 'error' && (
          <Alert variant="error" title="حدث خطأ غير متوقع" style={{ marginBottom: 20 }}
            action={<Button variant="dark" size="sm" onClick={submit} leftIcon={<Icon name="refresh" size={16} />}>إعادة المحاولة</Button>}>
            تعذّر إرسال {cfg.kind}. يرجى إعادة المحاولة.
          </Alert>
        )}
        {uploadErr && <Alert variant="warning" onClose={() => setUploadErr('')} style={{ marginBottom: 20 }}>{uploadErr}</Alert>}

        <Card padding={28} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Select label={cfg.catLabel} required value={cat} onChange={(v) => { setCat(v); setErrors((e) => ({ ...e, cat: undefined })); }} options={cfg.categories} error={errors.cat} />
          <Input label="الرقم القومي" required value={nid} onChange={(e) => { setNid(e.target.value.replace(/\D/g, '').slice(0, 14)); setErrors((x) => ({ ...x, nid: undefined })); }} placeholder="أدخل رقمك القومي (14 رقمًا)" inputMode="numeric" error={errors.nid} />
          <Input label={cfg.titleLabel} required value={title} onChange={(e) => { setTitle(e.target.value); setErrors((x) => ({ ...x, title: undefined })); }} placeholder={`اكتب ${cfg.titleLabel} باختصار`} error={errors.title} />
          <Textarea label={cfg.detailLabel} required rows={5} value={detail} onChange={(e) => { setDetail(e.target.value); setErrors((x) => ({ ...x, detail: undefined })); }} placeholder="اشرح التفاصيل بوضوح…" error={errors.detail} />
          <Textarea label="ملاحظات إضافية (اختياري)" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="أي ملاحظات إضافية…" />
          <div>
            <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: 16, color: 'var(--foe-ink-800)', marginBottom: 8 }}>المرفقات</div>
            <FileUpload files={files} onChange={setFiles} onError={setUploadErr} maxFiles={5} maxSizeMB={10} />
            <div style={{ fontFamily: 'var(--font-primary)', fontSize: 13, color: 'var(--foe-slate)', marginTop: 8 }}>الصيغ المدعومة: PDF, DOC, DOCX, JPG, PNG.</div>
          </div>
        </Card>

        <div style={{ position: 'sticky', bottom: 0, marginTop: 20, padding: '16px 0', background: 'linear-gradient(0deg,var(--foe-paper) 70%,transparent)', display: 'flex', justifyContent: 'flex-start' }}>
          <Button variant="primary" size="lg" loading={busy} onClick={submit}>{busy ? 'جارٍ الإرسال…' : cfg.submit}</Button>
        </div>
      </section>
    </Page>
  );
}

/* ---------------------------------------------------------------- Inquiry */
const MOCK_SUBMISSIONS = [
  { id: 'C-2025-445566', type: 'شكوى', date: '12 أغسطس 2025', status: 'تم الرد', title: 'طلب رفع مساحي لقطعة أرض بالمنطقة الصناعية',
    response: 'تمت مراجعة الشكوى من قبل الإدارة المختصة، وتم اتخاذ الإجراءات اللازمة لرفع المساحة خلال الأسبوع الجاري. نشكر تعاونكم.',
    attachments: [{ name: 'قرار-اللجنة.pdf', size: '1.2 م.ب' }, { name: 'المخطط-المساحي.png', size: '860 ك.ب' }] },
  { id: 'R-2025-101288', type: 'طلب', date: '20 أغسطس 2025', status: 'قيد الفحص', title: 'طلب تخصيص قطعة أرض زراعية بمشروع الدلتا الجديدة',
    response: null, attachments: [] },
  { id: 'S-2025-330071', type: 'اقتراح', date: '3 سبتمبر 2025', status: 'جديد', title: 'اقتراح إنشاء منصة رقمية لتسويق المحاصيل',
    response: null, attachments: [] },
  { id: 'R-2025-098120', type: 'طلب', date: '18 يوليو 2025', status: 'مغلق', title: 'طلب إفادة بالمستحقات المالية',
    response: 'تم صرف المستحقات المالية وإغلاق الطلب. برجاء مراجعة الإدارة المالية لأي استفسار.',
    attachments: [{ name: 'إفادة-الصرف.pdf', size: '540 ك.ب' }] },
];
const TYPE_COLOR = { 'شكوى': 'var(--foe-teal)', 'طلب': 'var(--foe-gold-deep)', 'اقتراح': 'var(--foe-success)' };
const TYPE_ICON = { 'شكوى': 'complaint', 'طلب': 'request', 'اقتراح': 'suggestion' };

function Inquiry({ go, prefill }) {
  const [nid, setNid] = React.useState('');
  const [track, setTrack] = React.useState(prefill || '');
  const [err, setErr] = React.useState('');
  const [phase, setPhase] = React.useState('idle'); // idle | loading | result | empty | neterr
  const [list, setList] = React.useState([]);

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
    <Page onHome={() => go('home')}>
      <section style={{ direction: 'rtl', padding: 'clamp(28px,4vw,48px) clamp(20px,5vw,80px)', maxWidth: 820, margin: '0 auto' }}>
        <Breadcrumb items={['الاستعلام']} onHome={() => go('home')} />
        <h1 style={{ margin: '0 0 6px', fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 28, color: 'var(--foe-ink-800)' }}>الاستعلام عن حالة الطلب</h1>
        <p style={{ margin: '0 0 20px', fontFamily: 'var(--font-primary)', fontSize: 16, color: 'var(--foe-ink-500)' }}>أدخل رقمك القومي لعرض جميع طلباتك، أو أضف رقم المتابعة للوصول إلى طلب محدد.</p>

        <Card padding={24} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 240px' }}>
            <Input label="الرقم القومي" required value={nid} onChange={(e) => { setNid(e.target.value.replace(/\D/g, '').slice(0, 14)); if (err) setErr(''); }} placeholder="14 رقمًا" error={err} inputMode="numeric" onKeyDown={(e) => { if (e.key === 'Enter') search(); }} />
          </div>
          <div style={{ flex: '1 1 240px' }}>
            <Input label="رقم المتابعة (اختياري)" value={track} onChange={(e) => setTrack(e.target.value)} placeholder="مثال: C-2025-445566" onKeyDown={(e) => { if (e.key === 'Enter') search(); }} />
          </div>
          <Button variant="primary" size="md" loading={phase === 'loading'} onClick={search} style={{ marginTop: 32 }}>بحث</Button>
        </Card>

        <div style={{ marginTop: 24 }}>
          {phase === 'idle' && (
            <Card tone="mist" padding={40} style={{ textAlign: 'center' }}>
              <span style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foe-slate)', margin: '0 auto 14px' }}><Icon name="search" size={30} /></span>
              <div style={{ fontFamily: 'var(--font-primary)', fontSize: 16, color: 'var(--foe-ink-500)' }}>أدخل رقمك القومي ثم اضغط على "بحث".</div>
            </Card>
          )}

          {phase === 'loading' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[0, 1, 2].map((i) => (
                <Card key={i} padding={20} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Skeleton w={44} h={44} r={12} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}><Skeleton w="60%" h={16} /><Skeleton w={110} h={12} /></div>
                  <Skeleton w={90} h={26} r={999} />
                </Card>
              ))}
            </div>
          )}

          {phase === 'empty' && (
            <Card padding={40} style={{ textAlign: 'center' }}>
              <span style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--foe-mist)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foe-slate)', margin: '0 auto 16px' }}><Icon name="search" size={34} /></span>
              <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 20, color: 'var(--foe-ink-800)' }}>لا توجد طلبات مسجّلة</h3>
              <p style={{ margin: '0 0 20px', fontFamily: 'var(--font-primary)', fontSize: 15, color: 'var(--foe-ink-500)' }}>لم نعثر على أي شكاوى أو طلبات أو اقتراحات مرتبطة بهذا الرقم القومي.</p>
              <Button variant="primary" onClick={() => setPhase('idle')}>بحث مرة أخرى</Button>
            </Card>
          )}

          {phase === 'neterr' && (
            <Alert variant="error" title="تعذر الاتصال بالخادم"
              action={<Button variant="dark" size="sm" onClick={search} leftIcon={<Icon name="refresh" size={16} />}>إعادة المحاولة</Button>}>
              يرجى التحقق من اتصالك بالإنترنت ثم إعادة المحاولة.
            </Alert>
          )}

          {phase === 'result' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 20, color: 'var(--foe-ink-800)' }}>طلباتك <span style={{ color: 'var(--foe-slate)', fontWeight: 400, fontSize: 16 }}>({list.length} نتيجة)</span></h2>
                <span style={{ fontFamily: 'var(--font-primary)', fontSize: 14, color: 'var(--foe-slate)' }}>الرقم القومي: {nid}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {list.map((item) => <SubmissionRow key={item.id} item={item} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </Page>
  );
}

function SubmissionRow({ item }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{
        display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '16px 20px', border: 'none',
        background: open ? 'var(--foe-mist)' : '#fff', cursor: 'pointer', direction: 'rtl', textAlign: 'right',
      }}>
        <span style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: TYPE_COLOR[item.type], display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <Icon name={TYPE_ICON[item.type]} size={22} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: 16, color: 'var(--foe-ink-800)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
          <div style={{ fontFamily: 'var(--font-primary)', fontSize: 13, color: 'var(--foe-slate)', marginTop: 4 }}>{item.type} · {item.id} · {item.date}</div>
        </div>
        <StatusBadge status={item.status} />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .18s' }}><path d="M6 9l6 6 6-6" stroke="var(--foe-slate)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        <div style={{ padding: '4px 20px 22px', direction: 'rtl', textAlign: 'right', borderTop: '1px solid var(--foe-line)' }}>
          <h4 style={{ margin: '18px 0 10px', fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 16, color: 'var(--foe-ink-800)' }}>رد الجهة المختصة</h4>
          {item.response ? (
            <p style={{ margin: 0, fontFamily: 'var(--font-primary)', fontSize: 15, lineHeight: 1.9, color: 'var(--foe-ink-500)', background: 'var(--foe-mist)', borderRadius: 12, padding: 16 }}>{item.response}</p>
          ) : (
            <Alert variant="warning" title="قيد الفحص">تم استلام الطلب وجارٍ مراجعته، وسيتم إشعارك عند وجود رد.</Alert>
          )}
          <h4 style={{ margin: '18px 0 10px', fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 16, color: 'var(--foe-ink-800)' }}>المرفقات</h4>
          {item.attachments.length === 0 ? (
            <div style={{ fontFamily: 'var(--font-primary)', fontSize: 14, color: 'var(--foe-slate)' }}>لا توجد مرفقات.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {item.attachments.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, boxShadow: 'inset 0 0 0 1px var(--foe-line)' }}>
                  <span style={{ color: 'var(--foe-teal)' }}><Icon name="file" size={22} /></span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-primary)', fontSize: 14, color: 'var(--foe-ink-800)' }}>{a.name}</div>
                    <div style={{ fontFamily: 'var(--font-primary)', fontSize: 12, color: 'var(--foe-slate)' }}>{a.size}</div>
                  </div>
                  <Button variant="outline" size="sm" leftIcon={<Icon name="download" size={16} />}>تحميل</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

/* ---------------------------------------------------------------- Router */
export default function App() {
  const [route, setRoute] = React.useState({ name: 'home', params: {} });
  const go = (name, params = {}) => { setRoute({ name, params }); window.scrollTo(0, 0); };
  React.useEffect(() => { try { localStorage.setItem('foe-cp-route', route.name); } catch (_) {} }, [route]);

  if (route.name === 'home') return <Home go={go} />;
  if (route.name === 'inquiry') return <Inquiry go={go} prefill={route.params.prefill} />;
  const cfg = FORMS[route.name];
  if (cfg) return <FormScreen cfg={cfg} go={go} />;
  return <Home go={go} />;
}
