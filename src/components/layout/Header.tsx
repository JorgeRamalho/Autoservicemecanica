import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { getSession } from '@/services/authService';

export function Header() {
  const location = useLocation();
  const session = getSession();

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/servicos', label: 'Serviços' },
    ...(session ? [{ to: '/dashboard', label: 'Painel' }] : []),
  ];

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" aria-label="Página inicial">
          <Logo size="sm" />
        </Link>

        <nav className="site-nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`site-nav__link ${location.pathname === link.to ? 'site-nav__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-nav__actions">
          {session ? (
            <>
              <span className="badge badge--accent">{session.matricula}</span>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  {session.nomeCompleto.split(' ')[0]}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="primary" size="sm">
                  Cadastrar
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
