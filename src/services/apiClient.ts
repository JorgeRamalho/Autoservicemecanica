/**
 * Cliente HTTP para a API Auto Service Mecânica
 */
const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('asm_jwt');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(data.error ?? 'Erro na requisição.', response.status);
  }

  return data as T;
}

export function setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem('asm_jwt', token);
  } else {
    localStorage.removeItem('asm_jwt');
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem('asm_jwt');
}

export async function isApiAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/health`, { method: 'GET' });
    return response.ok;
  } catch {
    return false;
  }
}
