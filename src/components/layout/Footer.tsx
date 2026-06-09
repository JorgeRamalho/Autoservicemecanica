import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { APP_CONFIG } from '@/config/appConfig';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <Logo />
            <p className="text-body-sm text-muted" style={{ marginTop: '1rem', maxWidth: '320px' }}>
              Oficina mecânica completa com cadastro digital, ordens de serviço e acompanhamento
              em tempo real. Profissionalismo que você sente na estrada.
            </p>
          </div>

          <div>
            <h6 style={{ marginBottom: '0.75rem' }}>Navegação</h6>
            <Link to="/" className="site-footer__link">
              Início
            </Link>
            <Link to="/servicos" className="site-footer__link">
              Serviços
            </Link>
            <Link to="/cadastro" className="site-footer__link">
              Cadastro
            </Link>
            <Link to="/login" className="site-footer__link">
              Login
            </Link>
          </div>

          <div>
            <h6 style={{ marginBottom: '0.75rem' }}>Contato</h6>
            <span className="site-footer__link">{APP_CONFIG.contact.phone}</span>
            <span className="site-footer__link">{APP_CONFIG.contact.email}</span>
            <span className="site-footer__link">{APP_CONFIG.contact.address}</span>
            <span className="site-footer__link">{APP_CONFIG.contact.hours}</span>
          </div>

          <div>
            <h6 style={{ marginBottom: '0.75rem' }}>Acesso Local</h6>
            <span className="site-footer__link">{APP_CONFIG.access.localhost}</span>
            <span className="site-footer__link text-muted">{APP_CONFIG.access.networkHint}</span>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} {APP_CONFIG.name}. Todos os direitos reservados.</span>
          <span>v{APP_CONFIG.version}</span>
        </div>
      </div>
    </footer>
  );
}
