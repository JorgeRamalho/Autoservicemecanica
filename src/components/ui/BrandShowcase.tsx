import type { CSSProperties } from 'react';
import { CAR_BRANDS } from '@/data/brandBackgrounds';

export function BrandShowcase() {
  return (
    <section
      className="section section-brands section-alt"
      style={
        {
          '--brand-section-bg': `url(${CAR_BRANDS[0].image})`,
        } as CSSProperties
      }
    >
      <div className="container">
        <div className="page-header text-center" style={{ marginInline: 'auto' }}>
          <p className="text-overline">Grandes Marcas</p>
          <h2 className="page-header__title">Atendemos Todas as Montadoras</h2>
          <p className="page-header__subtitle" style={{ marginInline: 'auto' }}>
            Da linha premium Ã  popular â€” nossa equipe Ã© especializada em veÃ­culos nacionais e
            importados com peÃ§as de qualidade e diagnÃ³stico preciso.
          </p>
        </div>

        <div className="brand-grid">
          {CAR_BRANDS.map((brand) => (
            <article key={brand.id} className="brand-tile" title={brand.name}>
              <div className="brand-tile__image">
                <img
                  src={brand.imageThumb}
                  alt={`${brand.name} â€” veículo esportivo de luxo`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="brand-tile__overlay" />
              <div className="brand-tile__content">
                <h3 className="brand-tile__name">{brand.name}</h3>
                <p className="brand-tile__tagline">{brand.tagline}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
