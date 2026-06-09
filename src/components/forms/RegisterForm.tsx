import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { InputField, SelectField, TextareaField } from '@/components/ui/Input';
import { FormPageBackground } from '@/components/ui/PageBackground';
import { registerUser } from '@/services/authService';
import { fetchAddressByCep } from '@/services/viacepService';
import { BRAZILIAN_STATES, GENDER_OPTIONS, USER_ROLES } from '@/data/services';
import type { UserRegistration } from '@/types';

type FormData = Omit<UserRegistration, 'id' | 'matricula' | 'createdAt'> & {
  confirmarSenha: string;
};

const initialForm: FormData = {
  nomeCompleto: '',
  cpf: '',
  rg: '',
  dataNascimento: '',
  genero: '',
  email: '',
  telefone: '',
  telefoneSecundario: '',
  senha: '',
  confirmarSenha: '',
  role: 'cliente',
  endereco: {
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  },
  veiculo: {
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    cor: '',
    km: '',
  },
  observacoes: '',
  aceiteTermos: false,
  aceiteNewsletter: false,
};

type FormErrors = Partial<Record<string, string>>;

function maskCPF(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
}

function maskPhone(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
}

function maskCEP(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.nomeCompleto.trim()) errors.nomeCompleto = 'Nome completo é obrigatório.';
  if (data.cpf.replace(/\D/g, '').length !== 11) errors.cpf = 'CPF inválido.';
  if (!data.email.includes('@')) errors.email = 'E-mail inválido.';
  if (data.telefone.replace(/\D/g, '').length < 10) errors.telefone = 'Telefone inválido.';
  if (data.senha.length < 6) errors.senha = 'Senha deve ter no mínimo 6 caracteres.';
  if (data.senha !== data.confirmarSenha) errors.confirmarSenha = 'Senhas não conferem.';
  if (!data.endereco.cep) errors['endereco.cep'] = 'CEP é obrigatório.';
  if (!data.endereco.cidade) errors['endereco.cidade'] = 'Cidade é obrigatória.';
  if (!data.endereco.estado) errors['endereco.estado'] = 'Estado é obrigatório.';
  if (!data.aceiteTermos) errors.aceiteTermos = 'Você deve aceitar os termos de uso.';

  return errors;
}

export function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [globalError, setGlobalError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  const lookupCep = async (cep: string) => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length !== 8) return;

    setCepLoading(true);
    setErrors((prev) => ({ ...prev, 'endereco.cep': undefined }));

    try {
      const address = await fetchAddressByCep(cep);

      if (!address) {
        setErrors((prev) => ({ ...prev, 'endereco.cep': 'CEP não encontrado.' }));
        return;
      }

      setForm((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          logradouro: address.logradouro || prev.endereco.logradouro,
          bairro: address.bairro || prev.endereco.bairro,
          cidade: address.cidade || prev.endereco.cidade,
          estado: address.estado || prev.endereco.estado,
          complemento: address.complemento || prev.endereco.complemento,
        },
      }));
    } catch {
      setErrors((prev) => ({
        ...prev,
        'endereco.cep': 'Erro ao buscar CEP. Verifique sua conexão.',
      }));
    } finally {
      setCepLoading(false);
    }
  };

  const updateField = (name: string, value: string | boolean) => {
    if (name.startsWith('endereco.')) {
      const key = name.split('.')[1] as keyof FormData['endereco'];
      setForm((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [key]: value },
      }));
    } else if (name.startsWith('veiculo.')) {
      const key = name.split('.')[1] as keyof FormData['veiculo'];
      setForm((prev) => ({
        ...prev,
        veiculo: { ...prev.veiculo, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setGlobalError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    let masked = finalValue as string;
    if (name === 'cpf') masked = maskCPF(value);
    if (name === 'telefone' || name === 'telefoneSecundario') masked = maskPhone(value);
    if (name === 'endereco.cep') masked = maskCEP(value);
    if (name === 'veiculo.placa') masked = value.toUpperCase();

    updateField(name, type === 'checkbox' ? (e.target as HTMLInputElement).checked : masked);

    if (name === 'endereco.cep') {
      const clean = masked.replace(/\D/g, '');
      if (clean.length === 8) {
        void lookupCep(masked);
      }
    }
  };

  const handleCepBlur = () => {
    void lookupCep(form.endereco.cep);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const { confirmarSenha: _, ...registrationData } = form;
    const result = await registerUser(registrationData);

    if (result.success) {
      setSuccess(`Cadastro realizado! Sua matrícula é: ${result.user.matricula}`);
      setTimeout(() => navigate('/login'), 2500);
    } else {
      setGlobalError(result.error);
    }
    setLoading(false);
  };

  return (
    <FormPageBackground brandId="porsche">
      <div className="form-card form-card--wide">
        <div className="form-card__header">
          <Logo size="lg" />
          <h2 className="form-card__title">Cadastro de Matrícula</h2>
          <p className="form-card__subtitle">
            Preencha todos os dados para criar sua conta no Auto Service Mecânica
          </p>
        </div>

        {globalError && <div className="alert alert--error">{globalError}</div>}
        {success && <div className="alert alert--success">{success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Dados Pessoais */}
          <section className="form-section">
            <h3 className="form-section__title">Dados Pessoais</h3>
            <div className="form-grid form-grid--2">
              <InputField
                label="Nome Completo"
                name="nomeCompleto"
                value={form.nomeCompleto}
                onChange={handleChange}
                error={errors.nomeCompleto}
                required
              />
              <InputField
                label="CPF"
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                error={errors.cpf}
                placeholder="000.000.000-00"
                required
              />
              <InputField
                label="RG"
                name="rg"
                value={form.rg}
                onChange={handleChange}
              />
              <InputField
                label="Data de Nascimento"
                name="dataNascimento"
                type="date"
                value={form.dataNascimento}
                onChange={handleChange}
              />
              <SelectField
                label="Gênero"
                name="genero"
                value={form.genero}
                onChange={handleChange}
                options={GENDER_OPTIONS.map((g) => ({ value: g.value, label: g.label }))}
              />
              <SelectField
                label="Tipo de Usuário"
                name="role"
                value={form.role}
                onChange={handleChange}
                options={USER_ROLES.map((r) => ({ value: r.value, label: r.label }))}
                required
              />
            </div>
          </section>

          {/* Contato */}
          <section className="form-section">
            <h3 className="form-section__title">Contato & Acesso</h3>
            <div className="form-grid form-grid--2">
              <InputField
                label="E-mail"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="seu@email.com"
                required
              />
              <InputField
                label="Telefone (WhatsApp)"
                name="telefone"
                type="tel"
                value={form.telefone}
                onChange={handleChange}
                error={errors.telefone}
                placeholder="(11) 98765-4321"
                required
              />
              <InputField
                label="Telefone Secundário"
                name="telefoneSecundario"
                type="tel"
                value={form.telefoneSecundario}
                onChange={handleChange}
              />
              <InputField
                label="Senha"
                name="senha"
                type="password"
                value={form.senha}
                onChange={handleChange}
                error={errors.senha}
                hint="Mínimo 6 caracteres"
                required
              />
              <InputField
                label="Confirmar Senha"
                name="confirmarSenha"
                type="password"
                value={form.confirmarSenha}
                onChange={handleChange}
                error={errors.confirmarSenha}
                required
              />
            </div>
          </section>

          {/* Endereço */}
          <section className="form-section">
            <h3 className="form-section__title">Endereço</h3>
            <div className="form-grid form-grid--3">
              <InputField
                label="CEP"
                name="endereco.cep"
                value={form.endereco.cep}
                onChange={handleChange}
                onBlur={handleCepBlur}
                error={errors['endereco.cep']}
                hint={cepLoading ? 'Buscando endereço...' : 'Preenchimento automático via ViaCEP'}
                placeholder="00000-000"
                required
              />
              <InputField
                label="Logradouro"
                name="endereco.logradouro"
                value={form.endereco.logradouro}
                onChange={handleChange}
                className="form-group--full"
              />
              <InputField
                label="Número"
                name="endereco.numero"
                value={form.endereco.numero}
                onChange={handleChange}
              />
              <InputField
                label="Complemento"
                name="endereco.complemento"
                value={form.endereco.complemento}
                onChange={handleChange}
              />
              <InputField
                label="Bairro"
                name="endereco.bairro"
                value={form.endereco.bairro}
                onChange={handleChange}
              />
              <InputField
                label="Cidade"
                name="endereco.cidade"
                value={form.endereco.cidade}
                onChange={handleChange}
                error={errors['endereco.cidade']}
                required
              />
              <SelectField
                label="Estado (UF)"
                name="endereco.estado"
                value={form.endereco.estado}
                onChange={handleChange}
                options={BRAZILIAN_STATES.map((uf) => ({ value: uf, label: uf }))}
                error={errors['endereco.estado']}
                required
              />
            </div>
          </section>

          {/* Veículo */}
          <section className="form-section">
            <h3 className="form-section__title">Veículo (opcional)</h3>
            <div className="form-grid form-grid--3">
              <InputField
                label="Placa"
                name="veiculo.placa"
                value={form.veiculo.placa}
                onChange={handleChange}
                placeholder="ABC-1D23"
              />
              <InputField
                label="Marca"
                name="veiculo.marca"
                value={form.veiculo.marca}
                onChange={handleChange}
                placeholder="Volkswagen"
              />
              <InputField
                label="Modelo"
                name="veiculo.modelo"
                value={form.veiculo.modelo}
                onChange={handleChange}
                placeholder="Gol"
              />
              <InputField
                label="Ano"
                name="veiculo.ano"
                value={form.veiculo.ano}
                onChange={handleChange}
                placeholder="2020"
              />
              <InputField
                label="Cor"
                name="veiculo.cor"
                value={form.veiculo.cor}
                onChange={handleChange}
              />
              <InputField
                label="Quilometragem"
                name="veiculo.km"
                value={form.veiculo.km}
                onChange={handleChange}
                placeholder="45000"
              />
            </div>
          </section>

          {/* Observações */}
          <section className="form-section">
            <TextareaField
              label="Observações"
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              placeholder="Informações adicionais sobre o veículo ou preferências de atendimento..."
            />

            <label className="form-check" style={{ marginTop: '1rem' }}>
              <input
                type="checkbox"
                name="aceiteTermos"
                className="form-check__input"
                checked={form.aceiteTermos}
                onChange={handleChange}
              />
              <span className="form-check__label">
                Li e aceito os Termos de Uso e a Política de Privacidade
                {errors.aceiteTermos && (
                  <span className="form-error" style={{ display: 'block' }}>
                    {errors.aceiteTermos}
                  </span>
                )}
              </span>
            </label>

            <label className="form-check" style={{ marginTop: '0.75rem' }}>
              <input
                type="checkbox"
                name="aceiteNewsletter"
                className="form-check__input"
                checked={form.aceiteNewsletter}
                onChange={handleChange}
              />
              <span className="form-check__label">
                Desejo receber promoções e lembretes de revisão por e-mail/WhatsApp
              </span>
            </label>
          </section>

          <div className="form-actions">
            <Button type="submit" variant="primary" size="lg" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </Button>
          </div>
        </form>

        <div className="form-footer">
          <p>
            Já possui conta? <Link to="/login">Faça login</Link>
          </p>
        </div>
      </div>
    </FormPageBackground>
  );
}
