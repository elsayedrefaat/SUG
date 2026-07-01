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
  upload:    'M12 16V6m0 0l-4 4m4-4l4 4M5 18h14',
  close:     'M6 6l12 12M18 6L6 18',
};

export default function Icon({ name, size = 24, color, stroke = 2, style = {} }) {
  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ color, flexShrink: 0, ...style }}>
      <path d={d} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
