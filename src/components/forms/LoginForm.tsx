import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/Input';
import { FormPageBackground } from '@/components/ui/PageBackground';
import { loginUser } from '@/services/authService';
import type { LoginCredentials } from '@/types';

export function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginCredentials>({
    identificador: '',
    senha: '',
    lembrarMe: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await loginUser(form);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <FormPageBackground brandId="mercedes">
      <div className="form-card">
        <div className="form-card__header">
          <Logo size="lg" />
          <h2 className="form-card__title">Entrar na sua conta</h2>
          <p className="form-card__subtitle">
            Use e-mail, CPF ou matrícula para acessar o sistema
          </p>
        </div>

        {error && <div className="alert alert--error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <InputField
              label="E-mail, CPF ou Matrícula"
              name="identificador"
              type="text"
              placeholder="demo@autoservice.com"
              value={form.identificador}
              onChange={handleChange}
              required
              autoComplete="username"
            />

            <InputField
              label="Senha"
              name="senha"
              type="password"
              placeholder="••••••••"
              value={form.senha}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <label className="form-check" style={{ marginTop: '1rem' }}>
            <input
              type="checkbox"
              name="lembrarMe"
              className="form-check__input"
              checked={form.lembrarMe}
              onChange={handleChange}
            />
            <span className="form-check__label">Manter-me conectado por 30 dias</span>
          </label>

          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>

        <div className="form-footer">
          <p>
            Ainda não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            <span className="text-muted">Demo: demo@autoservice.com / Demo@123</span>
          </p>
        </div>
      </div>
    </FormPageBackground>
  );
}
