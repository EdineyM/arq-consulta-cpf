import type { Client, Contract, Page, PointsSummary, Voucher, VoucherGenerateRequest } from './types';

// Configure sua URL base do backend aqui
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Busca cliente por CPF/CNPJ
 */
export async function getClientByCpf(cpf: string): Promise<Client | null> {
  try {
    const cleanCpf = cpf.replace(/\D/g, '');
    const response = await fetch(`${API_BASE_URL}/clients/form?cpf=${cleanCpf}`);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error('Erro ao buscar cliente');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    throw error;
  }
}

/**
 * Busca contratos de um cliente por CPF/CNPJ
 */
export async function getContractsByClientCpf(
  cpfCnpj: string,
  page = 0,
  size = 100
): Promise<Page<Contract>> {
  try {
    const cleanCpf = cpfCnpj.replace(/\D/g, '');
    const response = await fetch(
      `${API_BASE_URL}/contracts/client/${cleanCpf}?page=${page}&size=${size}&sort=eventDate,desc`
    );
    
    if (response.status === 404) {
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size,
        number: page,
        first: true,
        last: true,
        empty: true
      };
    }
    
    if (!response.ok) {
      throw new Error('Erro ao buscar contratos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar contratos:', error);
    throw error;
  }
}

/**
 * Calcula pontos disponíveis baseado nos contratos aprovados com data passada
 * Regra: 5% do número total de pessoas = pontos
 */
export function calculateAvailablePoints(contracts: Contract[]): PointsSummary {
  const now = new Date();
  
  // Filtrar apenas contratos APROVADOS com data passada
  const completedContracts = contracts.filter(contract => {
    const eventDate = new Date(contract.eventDate);
    return contract.status === 'APPROVED' && eventDate < now;
  });
  
  // Calcular pontos: 5% do número total de convidados de cada evento
  const totalPoints = completedContracts.reduce((sum, contract) => {
    const points = contract.numberTotalOfGuests * 0.05; // 5% das pessoas
    return sum + points;
  }, 0);
  
  return {
    totalPoints: Math.round(totalPoints * 100) / 100, // Arredondar para 2 casas decimais
    totalEvents: completedContracts.length,
    completedContracts
  };
}

/**
 * Calcula quantos pontos um contrato específico gerou
 */
export function calculateContractPoints(contract: Contract): number {
  return Math.round(contract.numberTotalOfGuests * 0.05 * 100) / 100;
}

/**
 * Gera um voucher usando pontos disponíveis
 */
export async function generateVoucher(request: { cpfCnpj: string; points: number }): Promise<Voucher> {
  try {
    if (!request || !request.cpfCnpj) {
      throw new Error('CPF é obrigatório para gerar voucher');
    }
    
    if (!request.points || request.points <= 0) {
      throw new Error('Quantidade de pontos inválida');
    }
    
    const cleanCpf = request.cpfCnpj.replace(/\D/g, '');
    
    // Agora usa percent ao invés de points
    const requestUrl = `${API_BASE_URL}/vouchers?cpfCnpj=${cleanCpf}&percent=${request.points}`;
    console.log('🔵 Gerando voucher - URL:', requestUrl);
    console.log('🔵 Dados da request:', { cpfCnpj: cleanCpf, percent: request.points });
    
    // O backend espera cpfCnpj e percent como query params
    const response = await fetch(
      requestUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('🔵 Response status:', response.status);
    console.log('🔵 Response ok:', response.ok);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erro ao gerar voucher' }));
      console.error('🔴 Erro na resposta:', error);
      throw new Error(error.message || 'Erro ao gerar voucher');
    }
    
    const voucherData = await response.json();
    console.log('🟢 Voucher criado com sucesso:', voucherData);
    return voucherData;
  } catch (error) {
    console.error('Erro ao gerar voucher:', error);
    throw error;
  }
}

/**
 * Busca vouchers de um cliente
 */
export async function getClientVouchers(cpfCnpj: string): Promise<Voucher[]> {
  try {
    const cleanCpf = cpfCnpj.replace(/\D/g, '');
    const response = await fetch(`${API_BASE_URL}/vouchers/client/${cleanCpf}`);
    
    if (response.status === 404) {
      return [];
    }
    
    if (!response.ok) {
      throw new Error('Erro ao buscar vouchers');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar vouchers:', error);
    return [];
  }
}

/**
 * Formata CPF/CNPJ para exibição
 */
export function formatCpfCnpj(value: string | undefined | null): string {
  if (!value) return '';
  
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    // CPF: XXX.XXX.XXX-XX
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cleaned.length === 14) {
    // CNPJ: XX.XXX.XXX/XXXX-XX
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  
  return value;
}

/**
 * Formata data para exibição em português
 */
export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

/**
 * Formata valor monetário
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
