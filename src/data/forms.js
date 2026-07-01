export const FORMS = {
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

export const PREFIX = { complaint: 'C', request: 'R', suggestion: 'S' };

export function refNumber(prefix) {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-2025-${n}`;
}
