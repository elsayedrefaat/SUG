# منصة الشكاوى والطلبات والاقتراحات — جهاز مستقبل مصر

FOE Complaints, Requests & Suggestions Platform — a React (Vite) single-page app for submitting and tracking complaints, requests, and suggestions using a national ID number. Fully RTL, Arabic UI.

## Features

- Submit a complaint, request, or suggestion through a validated form with category, national ID, title, details, and file attachments.
- Track submissions by national ID or a specific reference number, with mock status/response data.
- Reusable design-system components (Header, Footer, Card, Button, Input, Select, Textarea, Upload, StatusBadge, Alert, Skeleton, Breadcrumb) styled with CSS Modules on top of CSS custom-property design tokens.
- Routed with React Router — every screen (home, the three forms, inquiry) is a real URL.

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
  main.jsx              # React entry point
  App.jsx               # route definitions (React Router)
  styles.css            # design tokens (colors, spacing, typography)
  assets/                # images
  data/                  # form config + mock submissions (no UI)
  components/            # reusable UI, one folder per component (.jsx + .module.css)
    Layout/               # Header + <Outlet/> + Footer shell for every page
    Header/ Footer/ Card/ Button/ Input/ Select/ Textarea/ Upload/
    StatusBadge/ Alert/ Skeleton/ Breadcrumb/ SubmissionRow/ Icon/ FieldLabel/
  pages/                  # route-level screens (.jsx + .module.css)
    Home/                  # landing page with the four entry cards
    FormPage/              # shared complaint/request/suggestion form
    Inquiry/                # lookup + results list
```

## Notes

- Form submission and inquiry lookup are simulated (mock data, no backend).
- Fonts (Cairo, Inter, Nunito) are loaded from Google Fonts.
