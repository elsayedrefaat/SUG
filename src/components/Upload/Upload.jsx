import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import styles from './Upload.module.css';

const MB = 1024 * 1024;
const EXT_LABEL = { pdf: 'PDF', doc: 'DOC', docx: 'DOC', jpg: 'صورة', jpeg: 'صورة', png: 'صورة' };

function fmtSize(b) {
  return b >= MB ? (b / MB).toFixed(1) + ' م.ب' : Math.round(b / 1024) + ' ك.ب';
}
function extOf(name) {
  const m = /\.([a-z0-9]+)$/i.exec(name || '');
  return m ? m[1].toLowerCase() : '';
}

export default function Upload({
  files = [], onChange, onError, maxFiles = 5, maxSizeMB = 10,
  accept = ['pdf', 'doc', 'docx', 'jpg', 'png'],
}) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const idx = files.findIndex((f) => f.progress != null && f.progress < 100 && !f.error);
    if (idx < 0) return;
    const t = setTimeout(() => {
      const next = files.slice();
      const cur = next[idx];
      const p = (cur.progress || 0) + 25;
      if (p >= 100) next[idx] = Math.random() < 0.15 ? { ...cur, progress: undefined, error: true } : { ...cur, progress: undefined };
      else next[idx] = { ...cur, progress: p };
      onChange && onChange(next);
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

  function retry(i) {
    const next = files.slice();
    next[i] = { ...next[i], error: false, progress: 0 };
    onChange && onChange(next);
  }
  function remove(i) {
    const next = files.slice();
    next.splice(i, 1);
    onChange && onChange(next);
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current && inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        className={`${styles.dropzone} ${drag ? styles.drag : ''}`}
      >
        <span className={styles.iconWrap}><Icon name="upload" size={22} /></span>
        <span className={styles.prompt}>اسحب الملفات هنا أو اضغط لاختيار الملفات</span>
        <span className={styles.hint}>
          PDF · DOC · DOCX · JPG · PNG — بحد أقصى {maxFiles} ملفات، {maxSizeMB} م.ب لكل ملف
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept.map((e) => '.' + e).join(',')}
          className={styles.hiddenInput}
          onChange={(e) => { add(e.target.files); e.target.value = ''; }}
        />
      </div>

      {files.length > 0 && (
        <div className={styles.list}>
          {files.map((f, i) => (
            <div key={i} className={`${styles.row} ${f.error ? styles.error : ''}`}>
              <span className={`${styles.ext} ${f.error ? styles.error : ''}`}>{EXT_LABEL[f.ext] || 'ملف'}</span>
              <div className={styles.info}>
                <div className={styles.name}>{f.name}</div>
                <div className={`${styles.meta} ${f.error ? styles.error : ''}`}>
                  {f.error ? 'فشل رفع الملف' : fmtSize(f.size) + (f.progress != null && f.progress < 100 ? ` · جارٍ الرفع ${f.progress}%` : '')}
                </div>
                {f.progress != null && f.progress < 100 && (
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: f.progress + '%' }} />
                  </div>
                )}
              </div>
              {f.error && <button type="button" onClick={() => retry(i)} className={styles.retryBtn}>إعادة الرفع</button>}
              <button type="button" aria-label="حذف" onClick={() => remove(i)} className={styles.removeBtn}>
                <Icon name="close" size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
