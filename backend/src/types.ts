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

export interface UserRecord {
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
  senhaHash: string;
  role: UserRole;
  endereco: Address;
  veiculo: Vehicle;
  observacoes: string;
  aceiteTermos: boolean;
  aceiteNewsletter: boolean;
  createdAt: string;
}

export interface UserPublic extends Omit<UserRecord, 'senhaHash'> {}

export interface RegisterBody {
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
}

export interface LoginBody {
  identificador: string;
  senha: string;
  lembrarMe?: boolean;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    matricula: string;
    nomeCompleto: string;
    email: string;
    role: UserRole;
  };
  expiresAt: string;
}

export interface DashboardStats {
  totalUsuarios: number;
  clientesAtivos: number;
  servicosRealizados: number;
  agendamentosPendentes: number;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: UserRole;
    }
  }
}
