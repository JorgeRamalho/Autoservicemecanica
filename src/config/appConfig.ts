export const APP_CONFIG = {
  name: 'Auto Service Mecânica',
  slogan: 'Confiança na estrada, precisão na oficina',
  version: '1.0.0',

  access: {
    localhost: 'http://localhost:5173',
    localhostPreview: 'http://localhost:4173',
    networkHint: 'Use npm run dev:host para expor na rede local (ex: http://192.168.x.x:5173)',
  },

  contact: {
    phone: '(11) 3456-7890',
    whatsapp: '551134567890',
    email: 'contato@autoservicemecanica.com.br',
    address: 'Av. Automotiva, 1500 — Centro, São Paulo — SP',
    hours: 'Seg–Sex: 8h–18h | Sáb: 8h–13h',
  },

  social: {
    instagram: 'https://instagram.com/autoservicemecanica',
    facebook: 'https://facebook.com/autoservicemecanica',
    youtube: 'https://youtube.com/@autoservicemecanica',
  },
} as const;
