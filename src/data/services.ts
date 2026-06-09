import type { ServiceItem } from '@/types';

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    icon: '🔧',
    title: 'Revisão Completa',
    description:
      'Inspeção de 50 pontos: freios, suspensão, fluidos, filtros e diagnóstico eletrônico.',
    priceFrom: 'R$ 189,90',
  },
  {
    id: '2',
    icon: '🛢️',
    title: 'Troca de Óleo',
    description:
      'Óleo sintético ou mineral, filtro novo e checklist rápido de segurança.',
    priceFrom: 'R$ 89,90',
  },
  {
    id: '3',
    icon: '⚡',
    title: 'Elétrica Automotiva',
    description:
      'Diagnóstico de bateria, alternador, partida e sistema de iluminação.',
    priceFrom: 'R$ 120,00',
  },
  {
    id: '4',
    icon: '🛞',
    title: 'Alinhamento & Balanceamento',
    description:
      'Equipamento 3D de precisão para rodagem segura e economia de pneus.',
    priceFrom: 'R$ 79,90',
  },
  {
    id: '5',
    icon: '❄️',
    title: 'Ar-Condicionado',
    description:
      'Recarga de gás, higienização e reparo do sistema de climatização.',
    priceFrom: 'R$ 149,90',
  },
  {
    id: '6',
    icon: '🔩',
    title: 'Freios & Suspensão',
    description:
      'Pastilhas, discos, amortecedores e análise completa do sistema.',
    priceFrom: 'R$ 199,90',
  },
  {
    id: '7',
    icon: '📋',
    title: 'Ordem de Serviço Digital',
    description:
      'Acompanhamento online do status do veículo com aprovação por WhatsApp.',
    priceFrom: 'Incluso',
  },
  {
    id: '8',
    icon: '🚗',
    title: 'Diagnóstico Computadorizado',
    description:
      'Scanner OBD-II para leitura de falhas e reset de indicadores.',
    priceFrom: 'R$ 99,90',
  },
];

export const USER_ROLES = [
  { value: 'cliente', label: 'Cliente' },
  { value: 'mecanico', label: 'Mecânico / Técnico' },
  { value: 'admin', label: 'Administrador' },
] as const;

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

export const GENDER_OPTIONS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'outro', label: 'Outro' },
  { value: 'nao_informar', label: 'Prefiro não informar' },
];
