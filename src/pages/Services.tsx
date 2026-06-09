import type { CSSProperties } from 'react';
import { SERVICES } from '@/data/services';
import { CAR_BRANDS } from '@/data/brandBackgrounds';
import { PageBanner } from '@/components/ui/PageBackground';

export function ServicesPage() {
  return (
    <>
      <PageBanner brandId="lamborghini">
        <div className="page-header">
          <p className="text-overline">Catálogo</p>
          <h1 className="page-header__title">Serviços Automotivos</h1>
          <p className="page-header__subtitle">
            Conheça todos os serviços oferecidos pela Auto Service Mecânica. Orçamentos
            transparentes e ordens de serviço digitais com aprovação online.
          </p>
        </div>
      </PageBanner>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {SERVICES.map((service, index) => (
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
                <h3 className="card__title">{service.title}</h3>
                <p className="card__description">{service.description}</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                  }}
                >
                  <span className="badge badge--accent">{service.priceFrom}</span>
                  <span className="text-caption">ID: SRV-{service.id.padStart(3, '0')}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
