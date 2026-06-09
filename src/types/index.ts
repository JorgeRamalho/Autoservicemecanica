export type UserRole = 'cliente' | 'mecanico' | 'admin';

export interface Address {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface Vehicle {
  placa: string;
  marca: string;
  modelo: string;
  ano: string;
  cor: string;
  km: string;
}

export interface UserRegistration {
  id: string;
  matricula: string;
  nomeCompleto: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  genero: string;
  email: string;
  telefone: string;
  telefoneSecundario: string;
  senha: string;
  role: UserRole;
  endereco: Address;
  veiculo: Vehicle;
  observacoes: string;
  aceiteTermos: boolean;
  aceiteNewsletter: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  identificador: string;
  senha: string;
  lembrarMe: boolean;
}

export interface AuthSession {
  userId: string;
  matricula: string;
  nomeCompleto: string;
  email: string;
  role: UserRole;
  token: string;
  expiresAt: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  priceFrom: string;
}

export interface DashboardStats {
  totalUsuarios: number;
  clientesAtivos: number;
  servicosRealizados: number;
  agendamentosPendentes: number;
}
