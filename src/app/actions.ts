"use server";

import { createClient } from "@/lib/supabase/server";
import { format } from 'date-fns';

// Função para validar CPF
function isValidCPF(cpf: string): boolean {
  // Remove non-digits
  cpf = cpf.replace(/\D/g, "")

  // Check if it has 11 digits
  if (cpf.length !== 11) return false

  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cpf)) return false

  // Validate first check digit
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== Number.parseInt(cpf.charAt(9))) return false

  // Validate second check digit
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== Number.parseInt(cpf.charAt(10))) return false

  return true
}

// Gerar código para voucher (separado da renderização)
function gerarCodigoVoucher() {
  return `PIZZA${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
}

export async function verificarEGerarVoucher(cpf: string) {
  // Validar formato do CPF
  if (!isValidCPF(cpf)) {
    throw new Error("CPF inválido");
  }

  try {
    // Criar cliente Supabase
    const supabase = await createClient();

    // Obter dados do cliente (corrigido, sem await duplo)
    const { data: cliente, error: clienteError } = await supabase
      .from("clientes")
      .select("*")
      .eq("cpf", cpf)
      .single();

    if (clienteError) {
      throw new Error("Cliente não encontrado");
    }

    // Obter ano atual e anterior
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const anoAnterior = anoAtual - 1;

    // Obter eventos do ano anterior (corrigido)
    const { data: eventosAnoAnterior, error: eventosAnoAnteriorError } = await supabase
      .from("eventos")
      .select("id, data_evento, tipo_evento")
      .eq("cpf", cpf)
      .gte("data_evento", `${anoAnterior}-01-01`)
      .lte("data_evento", `${anoAnterior}-12-31`)
      .order("data_evento", { ascending: false });

    if (eventosAnoAnteriorError) {
      throw new Error("Erro ao obter eventos do ano anterior");
    }

    // Verificar se o cliente tem direito a voucher
    const temDireito = eventosAnoAnterior && eventosAnoAnterior.length > 0;

    // Se não tem direito, retornar resultado
    if (!temDireito) {
      return {
        cliente,
        eventos_ano_anterior: [],
        voucher_gerado: null,
        tem_direito: false,
        mensagem: "Você não realizou eventos no ano passado e não tem direito a vouchers promocionais.",
      };
    }

    // Padronizando para usar created_at em todo lugar
    const { count, error: vouchersExistentesError } = await supabase
      .from("vouchers")
      .select("*", { count: 'exact', head: true })
      .eq("cpf", cpf)
      .gte("date_generated", `${anoAtual}-01-01`);

    if (vouchersExistentesError) {
      throw new Error("Erro ao verificar vouchers existentes");
    }

    // Se já existe voucher, não gerar novo
    if (count && count > 0) {
      const { data: voucherExistente, error: voucherExistenteError } = await supabase
        .from("vouchers")
        .select("*")
        .eq("cpf", cpf)
        .gte("date_generated", `${anoAtual}-01-01`)
        .order("date_generated", { ascending: false })
        .limit(1)
        .single();

      if (voucherExistenteError) {
        throw new Error("Erro ao obter voucher existente");
      }

      return {
        cliente,
        eventos_ano_anterior: eventosAnoAnterior || [],
        voucher_gerado: voucherExistente,
        tem_direito: true,
        mensagem: "Você já possui um voucher promocional gerado este ano.",
      };
    }

    // Gerar código único para o voucher (fora do processo de renderização)
    const code = gerarCodigoVoucher();
    
    // Definir data de expiração (final do ano atual)
    const dataExpiracao = `${anoAtual}-12-31`;
    
    // Formatação consistente de data
    const dataGerada = format(dataAtual, 'yyyy-MM-dd');

    // Inserir novo voucher (corrigido)
    const { data: voucher, error: voucherError } = await supabase
      .from("vouchers")
      .insert({
        code,
        cpf,
        date_generated: dataGerada, // Usando created_at consistentemente
        value: 150, // Valor padrão
        utilized: false,
        expiration: dataExpiracao,
      })
      .select()
      .single();

    if (voucherError) {
      throw new Error("Erro ao gerar voucher");
    }

    return {
      cliente,
      eventos_ano_anterior: eventosAnoAnterior || [],
      voucher_gerado: voucher,
      tem_direito: true,
      mensagem: "Parabéns! Você ganhou um voucher promocional com base nos seus eventos do ano passado.",
    };
  } catch (error) {
    console.error("Erro ao verificar eventos e gerar voucher:", error);
    throw error;
  }
}