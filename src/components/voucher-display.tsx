"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Pizza, ArrowLeft, PartyPopper } from "lucide-react"
import { VoucherCard } from "./voucher-card"
import { verificarEGerarVoucher } from "@/app/actions"
import { format } from "date-fns"

const formattedDate = format(new Date(), "yyyy-MM-dd")

// Tipos para os dados
interface Cliente {
  nome: string
  cpf: string
}

interface Evento {
  id: number
  data_evento: string
  tipo_evento: string
  valor: number
}

interface Voucher {
  id: number
  code: string
  cpf: string
  value: number
  utilized: boolean
  date_used: boolean
  date_expiration: string
  date_generated: string
}

interface ResultadoVerificacao {
  cliente: Cliente
  eventos_ano_anterior: Evento[]
  voucher_gerado: Voucher | null
  tem_direito: boolean
  mensagem: string
}

export function VoucherDisplay({ cpf }: { cpf: string }) {
  const router = useRouter()
  const [resultado, setResultado] = useState<ResultadoVerificacao | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Se não tiver CPF, redirecionar para a página inicial
    if (!cpf) {
      router.push("/")
      return
    }

    async function verificarCliente() {
      try {
        setIsLoading(true)
        setError("")

        // Chamada real à API
        const resultado = await verificarEGerarVoucher(cpf)

        // Usa o resultado real
        setResultado(resultado)
      } catch (err) {
        console.error("Erro ao verificar cliente:", err)
        setError("Ops! Ainda não fez sua festa? Clique no botão abaixo para ralizar o seu orçamento.")
      } finally {
        setIsLoading(false)
      }
    }

    verificarCliente()
  }, [cpf, router])

  const voltar = () => {
    router.push("/")
  }

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg bg-white animate-pulse-slow">
        <CardContent className="flex flex-col items-center justify-center p-12">
          <Pizza className="h-16 w-16 text-red-600 animate-spin mb-4" />
          <h3 className="text-xl font-bold text-gray-900">Verificando seus vouchers...</h3>
          <p className="text-gray-700 mt-2">Estamos checando se você tem direito a desconto de 5% no próximo evento</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-6">
          <Alert variant="destructive" className="mb-4">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button onClick={voltar} className="w-full bg-red-600 hover:bg-red-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>

            <Button
              onClick={() => router.push("/orcamento")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Button
                onClick={() => router.push("/orcamento")}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              >
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 transform transition-all duration-500 opacity-20 group-hover:opacity-30 group-hover:-translate-x-2">
                  <Pizza className="h-16 w-16 text-white" />
                </div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Pizza className="h-5 w-5 animate-pulse" />
                  FAÇA JÁ SEU ORÇAMENTO
                  <Pizza className="h-5 w-5 animate-pulse" />
                </span>
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 transform transition-all duration-500 opacity-20 group-hover:opacity-30 group-hover:translate-x-2">
                  <Pizza className="h-16 w-16 text-white" />
                </div>
              </Button>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!resultado) {
    return (
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-6">
          <Alert variant="destructive" className="mb-4">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>Não foi possível verificar seus vouchers. Tente novamente.</AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button onClick={voltar} className="w-full bg-red-600 hover:bg-red-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>

            <Button
              onClick={() => router.push("/orcamento")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Button
                onClick={() => router.push("/orcamento")}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              >
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 transform transition-all duration-500 opacity-20 group-hover:opacity-30 group-hover:-translate-x-2">
                  <Pizza className="h-16 w-16 text-white" />
                </div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Pizza className="h-5 w-5 animate-pulse" />
                  FAÇA JÁ SEU ORÇAMENTO
                  <Pizza className="h-5 w-5 animate-pulse" />
                </span>
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 transform transition-all duration-500 opacity-20 group-hover:opacity-30 group-hover:translate-x-2">
                  <Pizza className="h-16 w-16 text-white" />
                </div>
              </Button>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Informações do cliente */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-gray-900">{resultado.cliente.nome}</CardTitle>
          <CardDescription>CPF: {formatCPF(resultado.cliente.cpf)}</CardDescription>
        </CardHeader>
      </Card>

      {/* Resultado da verificação */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {resultado.tem_direito ? (
              <>
                <PartyPopper className="h-5 w-5 text-red-600" />
                Parabéns!
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-600" />
                Sem vouchers disponíveis
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert
            variant={resultado.tem_direito ? "default" : "destructive"}
            className={resultado.tem_direito ? "bg-green-50 border-green-200 text-green-800" : ""}
          >
            {resultado.tem_direito ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertTitle>{resultado.tem_direito ? "Voucher Gerado!" : "Sem Vouchers"}</AlertTitle>
            <AlertDescription>{resultado.mensagem}</AlertDescription>
          </Alert>

          {resultado.tem_direito && resultado.voucher_gerado && (
            <div className="mt-6 animate-scale-in">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Seus Vouchers de Desconto:</h3>
              <div className="space-y-4">
                {Array.isArray(resultado.voucher_gerado)
                  ? resultado.voucher_gerado.map((voucher) => (
                      <VoucherCard key={voucher.id} voucher={voucher} highlight />
                    ))
                  : resultado.voucher_gerado && <VoucherCard voucher={resultado.voucher_gerado} highlight />}
              </div>
              {/* <VoucherCard voucher={resultado.voucher_gerado} highlight /> */}
            </div>
          )}

          {resultado.tem_direito && resultado.eventos_ano_anterior.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Eventos que você realizou no ano passado:</h3>
              <div className="space-y-3">
                {resultado.eventos_ano_anterior.map((evento) => (
                  <div
                    key={evento.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{evento.tipo_evento}</h4>
                      <p className="text-sm text-gray-700">{formatDate(evento.data_evento)}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="font-bold text-gray-900">Valor da festa: {formatCurrency(evento.valor)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="space-y-4">
              <Button
                onClick={voltar}
                className="w-full bg-red-600 hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-[0.98] text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a página inicial
              </Button>

              {!resultado.tem_direito && (
                <Button
                  onClick={() => router.push("/orcamento")}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Button
                    onClick={() => router.push("/orcamento")}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                  >
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 transform transition-all duration-500 opacity-20 group-hover:opacity-30 group-hover:-translate-x-2">
                      <Pizza className="h-16 w-16 text-white" />
                    </div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Pizza className="h-5 w-5 animate-pulse" />
                      FAÇA JÁ SEU ORÇAMENTO
                      <Pizza className="h-5 w-5 animate-pulse" />
                    </span>
                    <div className="absolute -right-10 top-1/2 -translate-y-1/2 transform transition-all duration-500 opacity-20 group-hover:opacity-30 group-hover:translate-x-2">
                      <Pizza className="h-16 w-16 text-white" />
                    </div>
                  </Button>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Utility function to format CPF
function formatCPF(cpf: string): string {
  cpf = cpf.replace(/\D/g, "")

  if (cpf.length > 11) {
    cpf = cpf.substring(0, 11)
  }

  if (cpf.length > 9) {
    return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}`
  } else if (cpf.length > 6) {
    return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6)}`
  } else if (cpf.length > 3) {
    return `${cpf.substring(0, 3)}.${cpf.substring(3)}`
  }

  return cpf
}

// Utility function to format currency
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

// Utility function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}
