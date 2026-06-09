import bcrypt from 'bcryptjs';
import { loadUsers, saveUsers, generateMatricula } from './db/users.js';

export async function seedDemoUser(): Promise<void> {
  const users = loadUsers();

  if (users.some((u) => u.email === 'demo@autoservice.com')) {
    return;
  }

  const senhaHash = await bcrypt.hash('Demo@123', 10);

  users.push({
    id: crypto.randomUUID(),
    matricula: generateMatricula(users.length),
    nomeCompleto: 'João Silva Demo',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    dataNascimento: '1990-05-15',
    genero: 'masculino',
    email: 'demo@autoservice.com',
    telefone: '(11) 98765-4321',
    telefoneSecundario: '',
    senhaHash,
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
    createdAt: new Date().toISOString(),
  });

  saveUsers(users);
  console.log('Usuário demo criado: demo@autoservice.com / Demo@123');
}
