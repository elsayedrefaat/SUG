export const MOCK_SUBMISSIONS = [
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

export const TYPE_COLOR = { 'شكوى': 'var(--foe-teal)', 'طلب': 'var(--foe-gold-deep)', 'اقتراح': 'var(--foe-success)' };
export const TYPE_ICON = { 'شكوى': 'complaint', 'طلب': 'request', 'اقتراح': 'suggestion' };
