import { useEffect, useState } from 'react';
import { CAR_BRANDS } from '@/data/brandBackgrounds';

interface HeroBackgroundProps {
  activeIndex: number;
}

export function HeroBackground({ activeIndex }: HeroBackgroundProps) {
  const heroBrands = CAR_BRANDS.slice(0, 6);
  const activeBrand = heroBrands[activeIndex];

  return (
    <div className="hero-bg" aria-hidden="true">
      {heroBrands.map((brand, index) => (
        <div
          key={brand.id}
          className={`hero-bg__slide ${index === activeIndex ? 'hero-bg__slide--active' : ''}`}
          style={{ backgroundImage: `url(${brand.image})` }}
        />
      ))}
      <div className="hero-bg__overlay" />
      <div className="hero-bg__glow" />
      <div className="hero-bg__brand-tag">
        <div className="hero-bg__brand-name">{activeBrand.name}</div>
        <div className="hero-bg__brand-tagline">{activeBrand.tagline}</div>
      </div>
    </div>
  );
}

interface HeroBrandCardProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function HeroBrandCard({ activeIndex, onSelect }: HeroBrandCardProps) {
  const heroBrands = CAR_BRANDS.slice(0, 6);
  const brand = heroBrands[activeIndex];

  return (
    <div className="hero__visual">
      <div>
        <div className="hero__brand-card">
          <img
            src={brand.imageThumb}
            alt={`Veículo ${brand.name}`}
            className="hero__brand-card-image"
            loading="eager"
          />
          <div className="hero__brand-card-overlay">
            <span className="hero__brand-card-label">{brand.name}</span>
            <span className="hero__brand-card-sublabel">{brand.tagline}</span>
          </div>
        </div>
        <div className="hero__brand-dots" role="tablist" aria-label="Marcas em destaque">
          {heroBrands.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={item.name}
              className={`hero__brand-dot ${index === activeIndex ? 'hero__brand-dot--active' : ''}`}
              onClick={() => onSelect(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function useHeroBrandSlider() {
  const heroBrands = CAR_BRANDS.slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroBrands.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [heroBrands.length]);

  return { activeIndex, setActiveIndex, heroBrands };
}
