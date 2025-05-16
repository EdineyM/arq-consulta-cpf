"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"

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

export async function verifyCpf(cpf: string) {
  // Validar formato do CPF
  if (!isValidCPF(cpf)) {
    return {
      eligible: false,
      message: "CPF inválido. Por favor, verifique o número informado.",
    }
  }

  try {
    // Criar cliente Supabase
    const supabase = createServerSupabaseClient()

    // Consultar o CPF na tabela clientes_2024
    const { data, error } = await supabase
      .from("clientes_2024")
      .select("id, nome, data_festa")
      .eq("cpf", cpf)
      .maybeSingle()

    if (error) {
      console.error("Erro ao consultar o Supabase:", error)
      throw new Error("Erro ao verificar o CPF no banco de dados")
    }

    if (data) {
      // Cliente encontrado - tem direito ao benefício
      return {
        eligible: true,
        message: `Você tem direito a levar duas pessoas extras na festa de 2025! Parabéns, ${data.nome}!`,
      }
    } else {
      // Cliente não encontrado
      return {
        eligible: false,
        message: "CPF não encontrado ou sem festa registrada em 2024.",
      }
    }
  } catch (error) {
    console.error("Erro ao verificar CPF:", error)
    throw new Error("Erro ao verificar o CPF")
  }
}
