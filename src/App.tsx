import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { RegisterPage } from '@/pages/Register';
import { ServicesPage } from '@/pages/Services';
import { DashboardPage } from '@/pages/Dashboard';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
