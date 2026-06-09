export interface CarBrand {
  id: string;
  name: string;
  tagline: string;
  image: string;
  imageThumb: string;
}

function brandImage(id: string): string {
  return `/brands/${id}.jpg`;
}

/** Imagens locais — veículos de alto luxo e esportivos (Unsplash/Pexels) */
export const CAR_BRANDS: CarBrand[] = [
  {
    id: 'bmw',
    name: 'BMW',
    tagline: 'Prazer em dirigir',
    image: brandImage('bmw'),
    imageThumb: brandImage('bmw'),
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    tagline: 'O melhor ou nada',
    image: brandImage('mercedes'),
    imageThumb: brandImage('mercedes'),
  },
  {
    id: 'audi',
    name: 'Audi',
    tagline: 'Avanço através da tecnologia',
    image: brandImage('audi'),
    imageThumb: brandImage('audi'),
  },
  {
    id: 'porsche',
    name: 'Porsche',
    tagline: 'Não há substituto',
    image: brandImage('porsche'),
    imageThumb: brandImage('porsche'),
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    tagline: 'Essência italiana',
    image: brandImage('ferrari'),
    imageThumb: brandImage('ferrari'),
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    tagline: 'Expect the unexpected',
    image: brandImage('lamborghini'),
    imageThumb: brandImage('lamborghini'),
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen',
    tagline: 'Feito de alemão',
    image: brandImage('volkswagen'),
    imageThumb: brandImage('volkswagen'),
  },
  {
    id: 'toyota',
    name: 'Toyota',
    tagline: 'Move o mundo',
    image: brandImage('toyota'),
    imageThumb: brandImage('toyota'),
  },
  {
    id: 'ford',
    name: 'Ford',
    tagline: 'Built Ford Tough',
    image: brandImage('ford'),
    imageThumb: brandImage('ford'),
  },
  {
    id: 'chevrolet',
    name: 'Chevrolet',
    tagline: 'Find new roads',
    image: brandImage('chevrolet'),
    imageThumb: brandImage('chevrolet'),
  },
];

export function getBrandById(id: string): CarBrand | undefined {
  return CAR_BRANDS.find((brand) => brand.id === id);
}
