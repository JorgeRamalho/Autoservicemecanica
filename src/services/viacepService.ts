export interface ViaCepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface AddressFromCep {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
}

export async function fetchAddressByCep(cep: string): Promise<AddressFromCep | null> {
  const cleanCep = cep.replace(/\D/g, '');

  if (cleanCep.length !== 8) {
    return null;
  }

  const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

  if (!response.ok) {
    throw new Error('Não foi possível consultar o CEP. Tente novamente.');
  }

  const data = (await response.json()) as ViaCepAddress;

  if (data.erro) {
    return null;
  }

  return {
    logradouro: data.logradouro ?? '',
    bairro: data.bairro ?? '',
    cidade: data.localidade ?? '',
    estado: data.uf ?? '',
    complemento: data.complemento ?? '',
  };
}
