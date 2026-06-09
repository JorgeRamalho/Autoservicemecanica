import type { CSSProperties, ReactNode } from 'react';
import { getBrandById } from '@/data/brandBackgrounds';

interface PageBannerProps {
  brandId?: string;
  image?: string;
  children: ReactNode;
}

export function PageBanner({ brandId = 'porsche', image, children }: PageBannerProps) {
  const brand = getBrandById(brandId);
  const bgImage = image ?? brand?.image ?? '';

  return (
    <section className="page-banner">
      <div
        className="page-banner__bg"
        style={{ '--page-banner-image': `url(${bgImage})` } as CSSProperties}
      />
      <div className="page-banner__overlay" />
      <div className="container">{children}</div>
    </section>
  );
}

interface FormPageBackgroundProps {
  brandId?: string;
  children: ReactNode;
}

export function FormPageBackground({ brandId = 'bmw', children }: FormPageBackgroundProps) {
  const brand = getBrandById(brandId);
  const bgImage = brand?.image ?? '';

  return (
    <div
      className="form-page"
      style={{ '--form-bg-image': `url(${bgImage})` } as CSSProperties}
    >
      <div className="form-page__bg" aria-hidden="true" />
      <div className="form-page__overlay" aria-hidden="true" />
      {children}
    </div>
  );
}

interface SectionCtaBackgroundProps {
  brandId?: string;
  children: ReactNode;
}

export function SectionCtaBackground({ brandId = 'ferrari', children }: SectionCtaBackgroundProps) {
  const brand = getBrandById(brandId);
  const bgImage = brand?.image ?? '';

  return (
    <section
      className="section section-cta"
      style={{ '--cta-bg-image': `url(${bgImage})` } as CSSProperties}
    >
      <div className="section-cta__bg" aria-hidden="true" />
      <div className="section-cta__overlay" aria-hidden="true" />
      <div className="container text-center">{children}</div>
    </section>
  );
}
