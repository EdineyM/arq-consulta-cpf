

import { createClient } from "@supabase/supabase-js"

// Criando o cliente Supabase para uso no servidor
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Variáveis de ambiente do Supabase não configuradas")
  }

  return createClient(supabaseUrl, supabaseKey)
}
