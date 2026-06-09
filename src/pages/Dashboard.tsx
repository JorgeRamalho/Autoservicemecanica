import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import {
  clearSession,
  getApiStatus,
  getDashboardStats,
  getSession,
  getUserById,
  getUsers,
} from '@/services/authService';
import type { AuthSession, DashboardStats, UserRegistration } from '@/types';
import { APP_CONFIG } from '@/config/appConfig';

export function DashboardPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<UserRegistration[]>([]);
  const [profile, setProfile] = useState<UserRegistration | null>(null);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline'>('offline');

  useEffect(() => {
    async function loadDashboard() {
      const currentSession = getSession();
      if (!currentSession) {
        navigate('/login');
        return;
      }

      setSession(currentSession);
      setApiStatus(await getApiStatus());
      setStats(await getDashboardStats());
      setUsers(await getUsers());
      setProfile((await getUserById(currentSession.userId)) ?? null);
    }

    void loadDashboard();
  }, [navigate]);

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  if (!session || !stats) return null;

  return (
    <section className="section">
      <div className="container">
        <div
          className="page-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p className="text-overline">Painel de Controle</p>
            <h1 className="page-header__title">Olá, {session.nomeCompleto.split(' ')[0]}!</h1>
            <p className="page-header__subtitle">
              Matrícula: <strong className="text-accent">{session.matricula}</strong> · Perfil:{' '}
              <span className="badge badge--accent">{session.role}</span> · API:{' '}
              <span className={`badge ${apiStatus === 'online' ? 'badge--success' : 'badge--accent'}`}>
                {apiStatus === 'online' ? 'JWT Online' : 'Modo Local'}
              </span>
            </p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-card__value">{stats.totalUsuarios}</div>
            <div className="stat-card__label">Usuários Cadastrados</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{stats.clientesAtivos}</div>
            <div className="stat-card__label">Clientes Ativos</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{stats.servicosRealizados}</div>
            <div className="stat-card__label">Serviços Realizados</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{stats.agendamentosPendentes}</div>
            <div className="stat-card__label">Agendamentos Pendentes</div>
          </div>
        </div>

        {profile && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Seus Dados</h3>
            <div className="grid grid-3">
              <div>
                <span className="text-caption">E-mail</span>
                <p>{profile.email}</p>
              </div>
              <div>
                <span className="text-caption">Telefone</span>
                <p>{profile.telefone}</p>
              </div>
              <div>
                <span className="text-caption">CPF</span>
                <p>{profile.cpf}</p>
              </div>
              {profile.veiculo.placa && (
                <div>
                  <span className="text-caption">Veículo</span>
                  <p>
                    {profile.veiculo.marca} {profile.veiculo.modelo} — {profile.veiculo.placa}
                  </p>
                </div>
              )}
              <div>
                <span className="text-caption">Endereço</span>
                <p>
                  {profile.endereco.logradouro}, {profile.endereco.numero} —{' '}
                  {profile.endereco.cidade}/{profile.endereco.estado}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Usuários Cadastrados (Acesso sob Demanda)</h3>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Perfil</th>
                  <th>Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: 'var(--color-neutral-500)' }}>
                      Nenhum usuário cadastrado ainda.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <span className="badge badge--accent">{user.matricula}</span>
                      </td>
                      <td>{user.nomeCompleto}</td>
                      <td>{user.email}</td>
                      <td>{user.telefone}</td>
                      <td>{user.role}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="alert alert--info" style={{ marginTop: '2rem' }}>
          <strong>Frontend:</strong> {APP_CONFIG.access.localhost} ·{' '}
          <strong>API:</strong> http://localhost:3001/api/health ·{' '}
          {APP_CONFIG.access.networkHint}
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/servicos">
            <Button variant="primary">Agendar Serviço →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
