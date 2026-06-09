import { Router } from 'express';
import bcrypt from 'bcryptjs';
import {
  generateMatricula,
  loadUsers,
  saveUsers,
  stripPassword,
} from '../db/users.js';
import { authMiddleware } from '../middleware/auth.js';
import { signToken } from '../utils/jwt.js';
import type { DashboardStats, LoginBody, RegisterBody } from '../types.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const body = req.body as RegisterBody;

  if (!body.nomeCompleto || !body.email || !body.senha || !body.cpf) {
    res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    return;
  }

  if (!body.aceiteTermos) {
    res.status(400).json({ error: 'É necessário aceitar os termos de uso.' });
    return;
  }

  const users = loadUsers();
  const cpfClean = body.cpf.replace(/\D/g, '');

  if (users.some((u) => u.email.toLowerCase() === body.email.toLowerCase())) {
    res.status(409).json({ error: 'Este e-mail já está cadastrado.' });
    return;
  }

  if (users.some((u) => u.cpf.replace(/\D/g, '') === cpfClean)) {
    res.status(409).json({ error: 'Este CPF já está cadastrado.' });
    return;
  }

  const senhaHash = await bcrypt.hash(body.senha, 10);

  const user = {
    id: crypto.randomUUID(),
    matricula: generateMatricula(users.length),
    nomeCompleto: body.nomeCompleto,
    cpf: body.cpf,
    rg: body.rg ?? '',
    dataNascimento: body.dataNascimento ?? '',
    genero: body.genero ?? '',
    email: body.email,
    telefone: body.telefone,
    telefoneSecundario: body.telefoneSecundario ?? '',
    senhaHash,
    role: body.role ?? 'cliente',
    endereco: body.endereco,
    veiculo: body.veiculo,
    observacoes: body.observacoes ?? '',
    aceiteTermos: body.aceiteTermos,
    aceiteNewsletter: body.aceiteNewsletter ?? false,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  saveUsers(users);

  res.status(201).json({
    message: 'Cadastro realizado com sucesso.',
    user: stripPassword(user),
  });
});

authRouter.post('/login', async (req, res) => {
  const { identificador, senha, lembrarMe } = req.body as LoginBody;

  if (!identificador || !senha) {
    res.status(400).json({ error: 'Identificador e senha são obrigatórios.' });
    return;
  }

  const users = loadUsers();
  const id = identificador.trim().toLowerCase();

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === id ||
      u.cpf.replace(/\D/g, '') === id.replace(/\D/g, '') ||
      u.matricula.toLowerCase() === id
  );

  if (!user) {
    res.status(401).json({ error: 'Usuário não encontrado. Verifique e-mail, CPF ou matrícula.' });
    return;
  }

  const valid = await bcrypt.compare(senha, user.senhaHash);

  if (!valid) {
    res.status(401).json({ error: 'Senha incorreta.' });
    return;
  }

  const { token, expiresAt } = signToken(
    { userId: user.id, role: user.role },
    Boolean(lembrarMe)
  );

  res.json({
    token,
    expiresAt,
    user: {
      id: user.id,
      matricula: user.matricula,
      nomeCompleto: user.nomeCompleto,
      email: user.email,
      role: user.role,
    },
  });
});

authRouter.get('/me', authMiddleware, (req, res) => {
  const user = loadUsers().find((u) => u.id === req.userId);

  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado.' });
    return;
  }

  res.json({ user: stripPassword(user) });
});

export const usersRouter = Router();

usersRouter.get('/', authMiddleware, (_req, res) => {
  const users = loadUsers().map(stripPassword);
  res.json({ users });
});

usersRouter.get('/dashboard/stats', authMiddleware, (_req, res) => {
  const users = loadUsers();
  const stats: DashboardStats = {
    totalUsuarios: users.length,
    clientesAtivos: users.filter((u) => u.role === 'cliente').length,
    servicosRealizados: Math.floor(users.length * 2.4),
    agendamentosPendentes: Math.max(0, Math.floor(users.length * 0.3)),
  };
  res.json(stats);
});
