"use server"

import { createClient } from "@/lib/supabase/server"

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

// Função para verificar eventos do ano anterior e gerar voucher se necessário
export async function verificarEGerarVoucher(cpf: string) {
  // Validar formato do CPF
  if (!isValidCPF(cpf)) {
    throw new Error("CPF inválido")
  }

  try {
    // Criar cliente Supabase
    const supabase = createClient()

    // Obter dados do cliente
    const { data: cliente, error: clienteError } = await (await supabase).from("clientes").select("*").eq("cpf", cpf).single()
      // .from("clientes")
      // .select("cpf, nome")
      // .eq("cpf", cpf)
      // .single()

    if (clienteError) {
      throw new Error("Cliente não encontrado")
    }

    // Obter ano atual e anterior
    const anoAtual = new Date().getFullYear()
    const anoAnterior = anoAtual - 1

    // Obter eventos do ano anterior
    const { data: eventosAnoAnterior, error: eventosAnoAnteriorError } = await (await supabase).from("eventos").select("id, data_evento, tipo_evento").eq("cpf", cpf).gte("data_evento", `${anoAnterior}-01-01`).lte("data_evento", `${anoAnterior}-12-31`).order("data_evento", { ascending: false })
      // .from("eventos")
      // .select("id, data_evento, tipo_evento")
      // .eq("cpf", cpf)
      // .gte("data_evento", `${anoAnterior}-01-01`)
      // .lte("data_evento", `${anoAnterior}-12-31`)
      // .order("data_evento", { ascending: false })

    if (eventosAnoAnteriorError) {
      throw new Error("Erro ao obter eventos do ano anterior")
    }

    // Verificar se o cliente tem direito a voucher
    const temDireito = eventosAnoAnterior && eventosAnoAnterior.length > 0

    // Se não tem direito, retornar resultado
    if (!temDireito) {
      return {
        cliente,
        eventos_ano_anterior: [],
        voucher_gerado: null,
        tem_direito: false,
        mensagem: "Você não realizou eventos no ano passado e não tem direito a vouchers promocionais.",
      }
    }

    // Verificar se já existe um voucher para este cliente este ano
    const { data: vouchersExistentes, error: vouchersExistentesError } = await (await supabase)
      .from("vouchers")
      .select("id")
      .eq("cpf", cpf)
      .gte("date_generated", `${anoAtual}-01-01`)
      .count()

    if (vouchersExistentesError) {
      throw new Error("Erro ao verificar vouchers existentes")
    }

    // Se já existe voucher, não gerar novo
    if (vouchersExistentes && vouchersExistentes.count > 0) {
      // Obter o voucher existente
      const { data: voucherExistente, error: voucherExistenteError } = await (await supabase)
        .from("vouchers")
        .select("*")
        .eq("cpf", cpf)
        .gte("date_generated", `${anoAtual}-01-01`)
        .order("date_generated", { ascending: false })
        .limit(1)
        .single()

      if (voucherExistenteError) {
        throw new Error("Erro ao obter voucher existente")
      }

      return {
        cliente,
        eventos_ano_anterior: eventosAnoAnterior || [],
        voucher_gerado: voucherExistente,
        tem_direito: true,
        mensagem: "Você já possui um voucher promocional gerado este ano.",
      }
    }

    // Gerar código único para o voucher
    const code = `PIZZA${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`

    // Definir data de expiração (final do ano atual)
    const dataExpiracao = `${anoAtual}-12-31`

    // Inserir novo voucher
    const { data: voucher, error: voucherError } = await (await supabase)
      .from("vouchers")
      .insert({
        code,
        cpf,
        date_generated: new Date().toISOString().split("T")[0],
        value: 150, // Valor padrão
        utilized: false,
        expiration: dataExpiracao,
      })
      .select()
      .single()

    if (voucherError) {
      throw new Error("Erro ao gerar voucher")
    }

    return {
      cliente,
      eventos_ano_anterior: eventosAnoAnterior || [],
      voucher_gerado: voucher,
      tem_direito: true,
      mensagem: "Parabéns! Você ganhou um voucher promocional com base nos seus eventos do ano passado.",
    }
  } catch (error) {
    console.error("Erro ao verificar eventos e gerar voucher:", error)
    throw error
  }
}
