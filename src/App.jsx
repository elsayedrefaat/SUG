import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import FormPage from './pages/FormPage/FormPage.jsx';
import Inquiry from './pages/Inquiry/Inquiry.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/complaint" element={<FormPage type="complaint" />} />
          <Route path="/request" element={<FormPage type="request" />} />
          <Route path="/suggestion" element={<FormPage type="suggestion" />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
