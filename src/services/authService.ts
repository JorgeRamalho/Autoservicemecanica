import type {
  AuthSession,
  DashboardStats,
  LoginCredentials,
  UserRegistration,
} from '@/types';
import { apiRequest, setAuthToken, getAuthToken, isApiAvailable, ApiError } from './apiClient';
import { getItem, setItem, removeItem, STORAGE_KEYS } from './storageService';

/* ── Fallback localStorage (offline / demo) ── */

function generateMatricula(): string {
  const year = new Date().getFullYear();
  const users = getLocalUsers();
  const seq = String(users.length + 1).padStart(5, '0');
  return `ASM-${year}-${seq}`;
}

function getLocalUsers(): UserRegistration[] {
  return getItem<UserRegistration[]>(STORAGE_KEYS.users) ?? [];
}

function saveLocalUsers(users: UserRegistration[]): void {
  setItem(STORAGE_KEYS.users, users);
}

function saveLocalSession(session: AuthSession): void {
  setItem(STORAGE_KEYS.session, session);
}

function registerLocal(
  data: Omit<UserRegistration, 'id' | 'matricula' | 'createdAt'>
): { success: true; user: UserRegistration } | { success: false; error: string } {
  const users = getLocalUsers();

  if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { success: false, error: 'Este e-mail já está cadastrado.' };
  }

  if (users.some((u) => u.cpf.replace(/\D/g, '') === data.cpf.replace(/\D/g, ''))) {
    return { success: false, error: 'Este CPF já está cadastrado.' };
  }

  const user: UserRegistration = {
    ...data,
    id: crypto.randomUUID(),
    matricula: generateMatricula(),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  saveLocalUsers(users);
  return { success: true, user };
}

function loginLocal(
  credentials: LoginCredentials
): { success: true; session: AuthSession } | { success: false; error: string } {
  const users = getLocalUsers();
  const identificador = credentials.identificador.trim().toLowerCase();

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === identificador ||
      u.cpf.replace(/\D/g, '') === identificador.replace(/\D/g, '') ||
      u.matricula.toLowerCase() === identificador
  );

  if (!user) {
    return { success: false, error: 'Usuário não encontrado. Verifique e-mail, CPF ou matrícula.' };
  }

  if (user.senha !== credentials.senha) {
    return { success: false, error: 'Senha incorreta.' };
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + (credentials.lembrarMe ? 30 : 1));

  const session: AuthSession = {
    userId: user.id,
    matricula: user.matricula,
    nomeCompleto: user.nomeCompleto,
    email: user.email,
    role: user.role,
    token: `local_${crypto.randomUUID()}`,
    expiresAt: expiresAt.toISOString(),
  };

  saveLocalSession(session);
  return { success: true, session };
}

/* ── API pública ── */

export function getSession(): AuthSession | null {
  const session = getItem<AuthSession>(STORAGE_KEYS.session);
  if (!session) return null;
  if (new Date(session.expiresAt) < new Date()) {
    clearSession();
    return null;
  }
  return session;
}

export function clearSession(): void {
  removeItem(STORAGE_KEYS.session);
  setAuthToken(null);
}

export async function registerUser(
  data: Omit<UserRegistration, 'id' | 'matricula' | 'createdAt'>
): Promise<{ success: true; user: UserRegistration } | { success: false; error: string }> {
  const apiUp = await isApiAvailable();

  if (apiUp) {
    try {
      const response = await apiRequest<{ user: UserRegistration }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return { success: true, user: response.user };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Erro ao cadastrar.';
      return { success: false, error: message };
    }
  }

  return registerLocal(data);
}

export async function loginUser(
  credentials: LoginCredentials
): Promise<{ success: true; session: AuthSession } | { success: false; error: string }> {
  const apiUp = await isApiAvailable();

  if (apiUp) {
    try {
      const response = await apiRequest<{
        token: string;
        expiresAt: string;
        user: { id: string; matricula: string; nomeCompleto: string; email: string; role: AuthSession['role'] };
      }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      setAuthToken(response.token);

      const session: AuthSession = {
        userId: response.user.id,
        matricula: response.user.matricula,
        nomeCompleto: response.user.nomeCompleto,
        email: response.user.email,
        role: response.user.role,
        token: response.token,
        expiresAt: response.expiresAt,
      };

      saveLocalSession(session);
      return { success: true, session };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Erro ao fazer login.';
      return { success: false, error: message };
    }
  }

  return loginLocal(credentials);
}

export async function getUsers(): Promise<UserRegistration[]> {
  const apiUp = await isApiAvailable();

  if (apiUp && getAuthToken()) {
    try {
      const response = await apiRequest<{ users: UserRegistration[] }>('/users');
      return response.users;
    } catch {
      return getLocalUsers();
    }
  }

  return getLocalUsers();
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const apiUp = await isApiAvailable();

  if (apiUp && getAuthToken()) {
    try {
      return await apiRequest<DashboardStats>('/users/dashboard/stats');
    } catch {
      /* fallback */
    }
  }

  const users = getLocalUsers();
  return {
    totalUsuarios: users.length,
    clientesAtivos: users.filter((u) => u.role === 'cliente').length,
    servicosRealizados: Math.floor(users.length * 2.4),
    agendamentosPendentes: Math.max(0, Math.floor(users.length * 0.3)),
  };
}

export async function getUserById(id: string): Promise<UserRegistration | undefined> {
  const apiUp = await isApiAvailable();

  if (apiUp && getAuthToken()) {
    try {
      const response = await apiRequest<{ user: UserRegistration }>('/auth/me');
      if (response.user.id === id) return response.user;
    } catch {
      /* fallback */
    }
  }

  return getLocalUsers().find((u) => u.id === id);
}

export async function seedDemoUser(): Promise<void> {
  const apiUp = await isApiAvailable();
  if (apiUp) return;

  const users = getLocalUsers();
  if (users.some((u) => u.email === 'demo@autoservice.com')) return;

  registerLocal({
    nomeCompleto: 'João Silva Demo',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    dataNascimento: '1990-05-15',
    genero: 'masculino',
    email: 'demo@autoservice.com',
    telefone: '(11) 98765-4321',
    telefoneSecundario: '',
    senha: 'Demo@123',
    role: 'cliente',
    endereco: {
      cep: '01310-100',
      logradouro: 'Av. Paulista',
      numero: '1000',
      complemento: 'Apto 101',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
    },
    veiculo: {
      placa: 'ABC-1D23',
      marca: 'Volkswagen',
      modelo: 'Gol',
      ano: '2020',
      cor: 'Prata',
      km: '45000',
    },
    observacoes: 'Usuário de demonstração',
    aceiteTermos: true,
    aceiteNewsletter: true,
  });
}

export async function getApiStatus(): Promise<'online' | 'offline'> {
  return (await isApiAvailable()) ? 'online' : 'offline';
}
