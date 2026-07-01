import React from 'react';
import foeLogo from '../assets/foe-logo.png';

/* FOE Complaints Platform — local kit primitives, built on the FOE design-system
   tokens (styles.css). Mirrors the DS component styling. Everything RTL. */

/* ---------------------------------------------------------------- Icons */
const ICONS = {
  complaint: 'M8 10h8M8 14h5M21 12a8 8 0 0 1-8 8H7l-4 3v-4.5A8 8 0 1 1 21 12Z',
  request:   'M14 3v4a1 1 0 0 0 1 1h4M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-4-5ZM9 13h6M9 17h4',
  suggestion:'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3Z',
  search:    'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-3.5-3.5',
  copy:      'M9 9h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1ZM5 15V6a1 1 0 0 1 1-1h9',
  home:      'M4 11l8-7 8 7M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9',
  back:      'M15 6l-6 6 6 6',
  forward:   'M9 6l6 6-6 6',
  check:     'M5 12.5l4.5 4.5L19 7',
  download:  'M12 4v11m0 0l-4-4m4 4l4-4M5 19h14',
  clock:     'M12 7v5l3 2M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z',
  refresh:   'M4 12a8 8 0 0 1 13.7-5.7L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.7L4 16M4 20v-4h4',
  chevron:   'M6 9l6 6 6-6',
  file:      'M14 3v4a1 1 0 0 0 1 1h4M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-4-5Z',
};
export function Icon({ name, size = 24, color, stroke = 2, style = {} }) {
  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ color, flexShrink: 0, ...style }}>
      <path d={d} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------- Button */
export function Button({ children, variant = 'primary', size = 'md', leftIcon, rightIcon, loading = false, disabled = false, fullWidth = false, style = {}, ...rest }) {
  const sizes = { md: { h: 48, fs: 18, pad: '8px 20px', gap: 8 }, sm: { h: 40, fs: 16, pad: '8px 14px', gap: 6 }, lg: { h: 56, fs: 20, pad: '12px 26px', gap: 10 } };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: { background: 'var(--foe-gold-deep)', color: '#fff', boxShadow: 'none' },
    dark: { background: 'var(--foe-charcoal)', color: 'var(--foe-paper)' },
    secondary: { background: 'var(--foe-teal)', color: '#fff' },
    outline: { background: '#eaeaea', color: 'var(--foe-ink-800)', boxShadow: 'inset 0 0 0 1px var(--foe-charcoal)' },
    ghost: { background: 'transparent', color: 'var(--foe-gold-deep)' },
  };
  const v = variants[variant] || variants.primary;
  const off = disabled || loading;
  return (
    <button type="button" disabled={off} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: s.gap,
      height: s.h, padding: s.pad, width: fullWidth ? '100%' : 'auto', borderRadius: 8, border: 'none',
      fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: s.fs, lineHeight: 1.4,
      cursor: off ? 'not-allowed' : 'pointer', opacity: off && !loading ? 0.45 : 1,
      transition: 'filter .16s, transform .08s', whiteSpace: 'nowrap', boxSizing: 'border-box', ...v, ...style,
    }}
      onMouseEnter={(e) => { if (!off) e.currentTarget.style.filter = 'brightness(0.93)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
      {...rest}
    >
      {loading && <span className="foe-spin" style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', borderTopColor: '#fff', display: 'inline-block' }} />}
      {!loading && leftIcon}
      {children != null && <span>{children}</span>}
      {!loading && rightIcon}
    </button>
  );
}

/* ---------------------------------------------------------------- Card */
export function Card({ children, padding = 24, radius = 16, tone = 'light', style = {}, ...rest }) {
  const tones = {
    light: { background: '#fff', boxShadow: 'var(--shadow-card)' },
    mist: { background: 'var(--foe-mist)' },
    outline: { background: '#fff', boxShadow: 'inset 0 0 0 1px var(--foe-line)' },
  };
  return <div style={{ borderRadius: radius, padding, boxSizing: 'border-box', ...(tones[tone] || tones.light), ...style }} {...rest}>{children}</div>;
}

/* ---------------------------------------------------------------- Field label */
function FieldLabel({ children, required }) {
  return (
    <span style={{ display: 'flex', gap: 4, fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: 16, color: 'var(--foe-ink-800)' }}>
      {children}
      {required && <span style={{ color: 'var(--foe-error)' }}>*</span>}
    </span>
  );
}

/* ---------------------------------------------------------------- Input */
export function Input({ label, required, placeholder, value, onChange, error, dir = 'rtl', leadingIcon, disabled, style = {}, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', ...style }}>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 16px', borderRadius: 8, background: 'rgb(249,249,249)', boxShadow: `inset 0 0 0 1px ${error ? 'var(--foe-error)' : 'rgb(77,77,77)'}`, opacity: disabled ? 0.5 : 1, direction: dir }}>
        {leadingIcon}
        <input value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} dir={dir} style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-primary)', fontSize: 15, color: 'var(--foe-ink-800)', textAlign: dir === 'rtl' ? 'right' : 'left' }} {...rest} />
      </div>
      {error && <span style={{ fontFamily: 'var(--font-primary)', fontSize: 13, color: 'var(--foe-error)', textAlign: dir === 'rtl' ? 'right' : 'left' }}>{error}</span>}
    </div>
  );
}

/* ---------------------------------------------------------------- Textarea */
export function Textarea({ label, required, placeholder, value, onChange, rows = 4, error, hint, dir = 'rtl', style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', ...style }}>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder} dir={dir} style={{
        width: '100%', boxSizing: 'border-box', resize: 'vertical', padding: '12px 16px', borderRadius: 8, border: 'none', outline: 'none',
        background: 'rgb(249,249,249)', boxShadow: `inset 0 0 0 1px ${error ? 'var(--foe-error)' : 'rgb(77,77,77)'}`,
        fontFamily: 'var(--font-primary)', fontSize: 15, lineHeight: 1.7, color: 'var(--foe-ink-800)', textAlign: dir === 'rtl' ? 'right' : 'left',
      }} />
      {(error || hint) && <span style={{ fontFamily: 'var(--font-primary)', fontSize: 13, color: error ? 'var(--foe-error)' : 'var(--foe-slate)', textAlign: dir === 'rtl' ? 'right' : 'left' }}>{error || hint}</span>}
    </div>
  );
}

/* ---------------------------------------------------------------- Select */
export function Select({ label, required, value, onChange, options = [], placeholder = 'اختر', error, dir = 'rtl', style = {} }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', position: 'relative', ...style }}>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <button type="button" onClick={() => setOpen((o) => !o)} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, height: 48, padding: '0 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
        background: 'rgb(249,249,249)', boxShadow: `inset 0 0 0 1px ${error ? 'var(--foe-error)' : 'rgb(77,77,77)'}`,
        fontFamily: 'var(--font-primary)', fontSize: 15, color: value ? 'var(--foe-ink-800)' : 'rgb(111,111,111)', direction: dir,
      }}>
        <span>{value || placeholder}</span>
        <Icon name="chevron" size={18} color="rgb(111,111,111)" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }} />
      </button>
      {open && (
        <div style={{ position: 'absolute', top: label ? 84 : 52, insetInline: 0, zIndex: 30, background: '#fff', borderRadius: 8, boxShadow: 'var(--shadow-card)', border: '1px solid var(--foe-line)', overflow: 'hidden', direction: dir, maxHeight: 260, overflowY: 'auto' }}>
          {options.map((o) => (
            <div key={o} onClick={() => { onChange && onChange(o); setOpen(false); }} style={{ padding: '11px 16px', cursor: 'pointer', fontFamily: 'var(--font-primary)', fontSize: 15, color: 'var(--foe-ink-800)', textAlign: dir === 'rtl' ? 'right' : 'left', background: o === value ? 'var(--foe-mist)' : '#fff' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--foe-mist)'}
              onMouseLeave={(e) => e.currentTarget.style.background = o === value ? 'var(--foe-mist)' : '#fff'}>{o}</div>
          ))}
        </div>
      )}
      {error && <span style={{ fontFamily: 'var(--font-primary)', fontSize: 13, color: 'var(--foe-error)', textAlign: dir === 'rtl' ? 'right' : 'left' }}>{error}</span>}
    </div>
  );
}

/* ---------------------------------------------------------------- StatusBadge */
const STATUS = {
  'جديد': { bg: 'rgba(46,144,250,0.12)', fg: 'var(--foe-info)' },
  'قيد الفحص': { bg: 'rgba(255,170,0,0.16)', fg: '#b17a00' },
  'تم الرد': { bg: 'rgba(23,178,106,0.14)', fg: 'var(--foe-success)' },
  'مغلق': { bg: 'rgba(69,69,69,0.12)', fg: 'var(--foe-ink-500)' },
};
export function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS['جديد'];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: 14, background: s.bg, color: s.fg }}>
    <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.fg }} />{status}
  </span>;
}

/* ---------------------------------------------------------------- Alert */
export function Alert({ variant = 'info', title, children, action, onClose, dir = 'rtl', style = {} }) {
  const tones = {
    success: { c: 'var(--foe-success)', bg: 'rgba(23,178,106,0.10)' },
    warning: { c: '#b17a00', bg: 'rgba(255,170,0,0.12)' },
    error: { c: 'var(--foe-error)', bg: 'rgba(240,68,56,0.10)' },
    info: { c: 'var(--foe-info)', bg: 'rgba(46,144,250,0.10)' },
  };
  const t = tones[variant] || tones.info;
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 12, background: t.bg, boxShadow: `inset -4px 0 0 ${t.c}`, direction: dir, textAlign: 'right', ...style }}>
      <span style={{ color: t.c, flexShrink: 0, marginTop: 1 }}><Icon name={variant === 'success' ? 'check' : variant === 'error' ? 'refresh' : 'clock'} size={20} /></span>
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 15, color: 'var(--foe-ink-800)', marginBottom: children ? 4 : 0 }}>{title}</div>}
        {children && <div style={{ fontFamily: 'var(--font-primary)', fontSize: 14, lineHeight: 1.6, color: 'var(--foe-ink-500)' }}>{children}</div>}
        {action && <div style={{ marginTop: 10 }}>{action}</div>}
      </div>
      {onClose && <button type="button" onClick={onClose} aria-label="إغلاق" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--foe-slate)', flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>}
    </div>
  );
}

/* ---------------------------------------------------------------- Skeleton */
export function Skeleton({ w = '100%', h = 14, r = 6, style = {} }) {
  return <div style={{ width: w, height: h, borderRadius: r, background: 'linear-gradient(90deg,var(--foe-mist) 25%,#eef0f3 37%,var(--foe-mist) 63%)', backgroundSize: '400% 100%', animation: 'foe-shimmer 1.4s ease infinite', ...style }} />;
}

/* ---------------------------------------------------------------- FileUpload */
const MB = 1024 * 1024;
function fmtSize(b) { return b >= MB ? (b / MB).toFixed(1) + ' م.ب' : Math.round(b / 1024) + ' ك.ب'; }
const EXT = { pdf: 'PDF', doc: 'DOC', docx: 'DOC', jpg: 'صورة', jpeg: 'صورة', png: 'صورة' };
function extOf(n) { const m = /\.([a-z0-9]+)$/i.exec(n || ''); return m ? m[1].toLowerCase() : ''; }
export function FileUpload({ files = [], onChange, onError, maxFiles = 5, maxSizeMB = 10, accept = ['pdf', 'doc', 'docx', 'jpg', 'png'] }) {
  const [drag, setDrag] = React.useState(false);
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    const idx = files.findIndex((f) => f.progress != null && f.progress < 100 && !f.error);
    if (idx < 0) return;
    const t = setTimeout(() => {
      const n = files.slice();
      const cur = n[idx];
      const p = (cur.progress || 0) + 25;
      if (p >= 100) n[idx] = Math.random() < 0.15 ? { ...cur, progress: undefined, error: true } : { ...cur, progress: undefined };
      else n[idx] = { ...cur, progress: p };
      onChange && onChange(n);
    }, 240);
    return () => clearTimeout(t);
  }, [files, onChange]);
  function add(list) {
    const next = [...files];
    for (const f of Array.from(list)) {
      if (next.length >= maxFiles) { onError && onError('الحد الأقصى للمرفقات ' + maxFiles + ' ملفات.'); break; }
      const ext = extOf(f.name);
      if (!accept.includes(ext)) { onError && onError('صيغة الملف غير مدعومة.'); continue; }
      if (f.size > maxSizeMB * MB) { onError && onError('حجم الملف يجب ألا يتجاوز ' + maxSizeMB + ' ميجابايت.'); continue; }
      next.push({ name: f.name, size: f.size, ext, progress: 0 });
    }
    onChange && onChange(next);
  }
  return (
    <div style={{ width: '100%' }}>
      <div role="button" tabIndex={0} onClick={() => inputRef.current && inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '26px 20px', borderRadius: 12, cursor: 'pointer', textAlign: 'center', background: drag ? 'var(--gold-light)' : 'rgb(249,249,249)', border: `2px dashed ${drag ? 'var(--foe-gold-deep)' : 'var(--foe-gray-300)'}`, transition: 'background .15s,border-color .15s' }}>
        <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--gold-light)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foe-gold-deep)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 16V6m0 0l-4 4m4-4l4 4M5 18h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <span style={{ fontFamily: 'var(--font-primary)', fontSize: 15, color: 'var(--foe-ink-800)' }}>اسحب الملفات هنا أو اضغط لاختيار الملفات</span>
        <span style={{ fontFamily: 'var(--font-primary)', fontSize: 12.5, color: 'var(--foe-slate)' }}>PDF · DOC · DOCX · JPG · PNG — بحد أقصى {maxFiles} ملفات، {maxSizeMB} م.ب لكل ملف</span>
        <input ref={inputRef} type="file" multiple accept={accept.map((e) => '.' + e).join(',')} style={{ display: 'none' }} onChange={(e) => { add(e.target.files); e.target.value = ''; }} />
      </div>
      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
          {files.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: '#fff', boxShadow: `inset 0 0 0 1px ${f.error ? 'var(--foe-error)' : 'var(--foe-line)'}` }}>
              <span style={{ width: 40, height: 40, borderRadius: 8, background: f.error ? 'rgba(240,68,56,0.10)' : 'var(--foe-mist)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 11, color: f.error ? 'var(--foe-error)' : 'var(--foe-teal)', flexShrink: 0 }}>{EXT[f.ext] || 'ملف'}</span>
              <div style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-primary)', fontSize: 14, color: 'var(--foe-ink-800)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                <div style={{ fontFamily: 'var(--font-primary)', fontSize: 12, color: f.error ? 'var(--foe-error)' : 'var(--foe-slate)' }}>{f.error ? 'فشل رفع الملف' : fmtSize(f.size) + (f.progress != null && f.progress < 100 ? ` · جارٍ الرفع ${f.progress}%` : '')}</div>
                {f.progress != null && f.progress < 100 && <div style={{ height: 4, borderRadius: 2, background: 'var(--foe-line)', marginTop: 6, overflow: 'hidden' }}><div style={{ height: '100%', width: f.progress + '%', background: 'var(--foe-gold-deep)', transition: 'width .2s' }} /></div>}
              </div>
              {f.error && <button type="button" onClick={() => { const n = files.slice(); n[i] = { ...n[i], error: false, progress: 0 }; onChange && onChange(n); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--foe-error)', fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: 13, flexShrink: 0 }}>إعادة الرفع</button>}
              <button type="button" aria-label="حذف" onClick={() => { const n = files.slice(); n.splice(i, 1); onChange && onChange(n); }} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--foe-slate)', flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- Header / Footer / Shell */
export function AppHeader({ onHome }) {
  return (
    <header style={{ height: 76, background: 'rgb(33,33,33)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(20px,5vw,80px)', direction: 'rtl' }}>
      <div onClick={onHome} style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
        <img src={foeLogo} alt="جهاز مستقبل مصر" style={{ height: 42 }} />
        <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 17, color: '#C3AB76', borderInlineStart: '1px solid rgba(255,255,255,.25)', paddingInlineStart: 14 }}>منصة الشكاوى والطلبات</span>
      </div>
    </header>
  );
}
export function AppFooter() {
  return (
    <footer style={{ background: 'linear-gradient(103.7deg,#0d0d0d,#282828)', color: 'var(--foe-gray-300)', direction: 'rtl', padding: '28px clamp(20px,5vw,80px)', textAlign: 'center', fontFamily: 'var(--font-primary)', fontSize: 14 }}>
      جهاز مستقبل مصر للتنمية المستدامة · جميع الحقوق محفوظة 2025 ©
    </footer>
  );
}
