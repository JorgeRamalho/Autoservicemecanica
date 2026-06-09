import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { BrandShowcase } from '@/components/ui/BrandShowcase';
import {
  HeroBackground,
  HeroBrandCard,
  useHeroBrandSlider,
} from '@/components/ui/HeroBackground';
import { SectionCtaBackground } from '@/components/ui/PageBackground';
import { SERVICES } from '@/data/services';
import { CAR_BRANDS } from '@/data/brandBackgrounds';
import { APP_CONFIG } from '@/config/appConfig';

export function HomePage() {
  const featured = SERVICES.slice(0, 4);
  const { activeIndex, setActiveIndex } = useHeroBrandSlider();

  return (
    <>
      <section className="section section-hero section-hero--branded">
        <HeroBackground activeIndex={activeIndex} />
        <div className="container hero">
          <div className="hero__content">
            <span className="hero__badge">🔧 Oficina Automotiva Premium</span>
            <h1 className="hero__title">
              <span className="text-gradient">{APP_CONFIG.name}</span>
            </h1>
            <p className="hero__subtitle">{APP_CONFIG.slogan}</p>
            <p className="text-body-sm text-muted" style={{ marginBottom: '2rem' }}>
              Cadastro digital, ordens de serviço online, histórico completo do veículo e
              acompanhamento em tempo real — tudo em um só lugar.
            </p>
            <div className="hero__actions">
              <Link to="/cadastro">
                <Button variant="primary" size="lg">
                  Criar Matrícula
                </Button>
              </Link>
              <Link to="/servicos">
                <Button variant="secondary" size="lg">
                  Ver Serviços
                </Button>
              </Link>
            </div>
          </div>
          <HeroBrandCard activeIndex={activeIndex} onSelect={setActiveIndex} />
        </div>
      </section>

      <BrandShowcase />

      <section className="section">
        <div className="container">
          <div className="page-header text-center" style={{ marginInline: 'auto' }}>
            <p className="text-overline">Nossos Serviços</p>
            <h2 className="page-header__title">Soluções Completas para seu Veículo</h2>
            <p className="page-header__subtitle" style={{ marginInline: 'auto' }}>
              Do diagnóstico à entrega, oferecemos serviços profissionais com transparência
              e tecnologia de ponta.
            </p>
          </div>

          <div className="grid grid-4" style={{ marginTop: '3rem' }}>
            {featured.map((service, index) => (
              <article
                key={service.id}
                className="card card--brand-bg"
                style={
                  {
                    '--card-brand-image': `url(${CAR_BRANDS[index % CAR_BRANDS.length].imageThumb})`,
                  } as CSSProperties
                }
              >
                <div className="card__icon">{service.icon}</div>
                <h4 className="card__title">{service.title}</h4>
                <p className="card__description">{service.description}</p>
                <p className="text-accent text-body-sm" style={{ marginTop: '0.75rem' }}>
                  A partir de {service.priceFrom}
                </p>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/servicos">
              <Button variant="secondary">Ver todos os serviços →</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="grid grid-3">
            <article className="card">
              <div className="card__icon">📋</div>
              <h4 className="card__title">Matrícula Digital</h4>
              <p className="card__description">
                Cadastro completo com CPF, e-mail, telefone, endereço e dados do veículo.
                Matrícula única gerada automaticamente.
              </p>
            </article>
            <article className="card">
              <div className="card__icon">🔐</div>
              <h4 className="card__title">Login Seguro</h4>
              <p className="card__description">
                Acesse com e-mail, CPF ou matrícula. Sessão persistente com opção de
                lembrar-me por 30 dias.
              </p>
            </article>
            <article className="card">
              <div className="card__icon">📊</div>
              <h4 className="card__title">Painel de Dados</h4>
              <p className="card__description">
                Visualize estatísticas, usuários cadastrados e informações de demanda em
                tempo real no dashboard.
              </p>
            </article>
          </div>
        </div>
      </section>

      <SectionCtaBackground brandId="ferrari">
        <h2>Pronto para cuidar do seu carro?</h2>
        <p className="text-muted" style={{ margin: '1rem auto 2rem', maxWidth: '480px' }}>
          Cadastre-se agora e tenha acesso ao histórico completo de serviços, agendamentos
          e orçamentos digitais.
        </p>
        <Link to="/cadastro">
          <Button variant="primary" size="lg">
            Começar Cadastro Gratuito
          </Button>
        </Link>
      </SectionCtaBackground>
    </>
  );
}
