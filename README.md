# منصة الشكاوى والطلبات والاقتراحات — جهاز مستقبل مصر

FOE Complaints, Requests & Suggestions Platform — a React (Vite) single-page app for submitting and tracking complaints, requests, and suggestions using a national ID number. Fully RTL, Arabic UI.

## Features

- Submit a complaint, request, or suggestion through a validated form with category, national ID, title, details, and file attachments.
- Track submissions by national ID or a specific reference number, with mock status/response data.
- Reusable design-system component kit (buttons, cards, inputs, select, file upload, alerts, status badges) built on CSS custom-property design tokens.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  main.jsx            # React entry point
  App.jsx             # router + screens (home, forms, inquiry)
  components/Kit.jsx   # design-system primitives
  assets/              # images
  styles.css           # design tokens (colors, spacing, typography)
```

## Notes

- Form submission and inquiry lookup are simulated (mock data, no backend).
- Fonts (Cairo, Inter, Nunito) are loaded from Google Fonts.
