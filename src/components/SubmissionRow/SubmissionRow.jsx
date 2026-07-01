import { useState } from 'react';
import Card from '../Card/Card.jsx';
import Icon from '../Icon/Icon.jsx';
import Button from '../Button/Button.jsx';
import StatusBadge from '../StatusBadge/StatusBadge.jsx';
import Alert from '../Alert/Alert.jsx';
import { TYPE_COLOR, TYPE_ICON } from '../../data/mockSubmissions.js';
import styles from './SubmissionRow.module.css';

export default function SubmissionRow({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <Card padding={0} className={styles.card}>
      <button type="button" onClick={() => setOpen((o) => !o)} className={`${styles.trigger} ${open ? styles.open : ''}`}>
        <span className={styles.typeIcon} style={{ background: TYPE_COLOR[item.type] }}>
          <Icon name={TYPE_ICON[item.type]} size={22} />
        </span>
        <div className={styles.summary}>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.meta}>{item.type} · {item.id} · {item.date}</div>
        </div>
        <StatusBadge status={item.status} />
        <Icon name="chevron" size={20} color="var(--foe-slate)" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .18s' }} />
      </button>

      {open && (
        <div className={styles.details}>
          <h4 className={styles.sectionTitle}>رد الجهة المختصة</h4>
          {item.response ? (
            <p className={styles.response}>{item.response}</p>
          ) : (
            <Alert variant="warning" title="قيد الفحص">تم استلام الطلب وجارٍ مراجعته، وسيتم إشعارك عند وجود رد.</Alert>
          )}

          <h4 className={styles.sectionTitle}>المرفقات</h4>
          {item.attachments.length === 0 ? (
            <div className={styles.noAttachments}>لا توجد مرفقات.</div>
          ) : (
            <div className={styles.attachments}>
              {item.attachments.map((a, i) => (
                <div key={i} className={styles.attachment}>
                  <span className={styles.attachmentIcon}><Icon name="file" size={22} /></span>
                  <div className={styles.attachmentInfo}>
                    <div className={styles.attachmentName}>{a.name}</div>
                    <div className={styles.attachmentSize}>{a.size}</div>
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
