"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Loader2, Pizza, Ticket, Calendar, User } from "lucide-react"
import { VoucherCard } from "./voucher-card"
import { EventosList } from "./eventos-list"

// Tipos para os dados
interface Evento {
  id: number
  data_evento: string
  tipo_evento: string
  valor: number
}

interface Voucher {
  id: number
  codigo: string
  data_geracao: string
  valor: number
  percentual_desconto: number
  utilizado: boolean
  expiracao: string
}

interface ResultadoVerificacao {
  cliente: {
    nome: string
    cpf: string
  }
  eventos_ano_anterior: Evento[]
  eventos_ano_atual: Evento[]
  vouchers_disponiveis: Voucher[]
  vouchers_utilizados: Voucher[]
  pode_gerar_voucher: boolean
  quantidade_disponivel: number
}

export function VoucherGenerator() {
  const [cpf, setCpf] = useState("")
  const [resultado, setResultado] = useState<ResultadoVerificacao | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [voucherGerado, setVoucherGerado] = useState<Voucher | null>(null)
  const [isGeneratingVoucher, setIsGeneratingVoucher] = useState(false)

  // Função para formatar CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "") // Remove não-dígitos

    if (value.length > 11) {
      value = value.slice(0, 11)
    }

    // Formata com pontos e traço
    if (value.length > 9) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}.${value.slice(3)}`
    }

    setCpf(value)
  }

  // Função para verificar eventos e vouchers
  const handleVerificar = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    const cleanCpf = cpf.replace(/\D/g, "")
    if (cleanCpf.length !== 11) {
      setError("CPF deve conter 11 dígitos")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulação de chamada à API - em um ambiente real, isso seria uma chamada ao backend
      // const response = await verificarEventosEVouchers(cleanCpf)

      // Dados simulados para demonstração
      const dadosSimulados: ResultadoVerificacao = {
        cliente: {
          nome: "Cliente Exemplo",
          cpf: cleanCpf,
        },
        eventos_ano_anterior: [
          { id: 1, data_evento: "2023-05-15", tipo_evento: "Festa de Aniversário", valor: 1500 },
          { id: 2, data_evento: "2023-08-22", tipo_evento: "Confraternização", valor: 2000 },
          { id: 3, data_evento: "2023-12-10", tipo_evento: "Festa de Fim de Ano", valor: 2500 },
        ],
        eventos_ano_atual: [{ id: 4, data_evento: "2024-02-14", tipo_evento: "Jantar Romântico", valor: 800 }],
        vouchers_disponiveis: [
          {
            id: 1,
            codigo: "PIZZA2024A",
            data_geracao: "2024-01-05",
            valor: 150,
            percentual_desconto: 10,
            utilizado: false,
            expiracao: "2024-12-31",
          },
        ],
        vouchers_utilizados: [
          {
            id: 2,
            codigo: "PIZZA2024B",
            data_geracao: "2024-01-05",
            valor: 200,
            percentual_desconto: 15,
            utilizado: true,
            expiracao: "2024-12-31",
          },
        ],
        pode_gerar_voucher: true,
        quantidade_disponivel: 2,
      }

      setResultado(dadosSimulados)
    } catch (err) {
      setError("Ocorreu um erro ao verificar o CPF. Tente novamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para gerar um novo voucher
  const handleGerarVoucher = async () => {
    if (!resultado) return

    setIsGeneratingVoucher(true)

    try {
      // Simulação de geração de voucher
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const novoVoucher: Voucher = {
        id: Math.floor(Math.random() * 1000),
        codigo: `PIZZA${Math.floor(Math.random() * 10000)}`,
        data_geracao: new Date().toISOString().split("T")[0],
        valor: Math.floor(Math.random() * 100) + 100,
        percentual_desconto: 15,
        utilizado: false,
        expiracao: "2024-12-31",
      }

      setVoucherGerado(novoVoucher)

      // Atualiza o resultado para refletir o novo voucher
      setResultado({
        ...resultado,
        vouchers_disponiveis: [...resultado.vouchers_disponiveis, novoVoucher],
        quantidade_disponivel: resultado.quantidade_disponivel - 1,
        pode_gerar_voucher: resultado.quantidade_disponivel - 1 > 0,
      })
    } catch (err) {
      setError("Erro ao gerar voucher. Tente novamente.")
      console.error(err)
    } finally {
      setIsGeneratingVoucher(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Formulário de consulta */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-amber-600" />
            Consulta de Cliente
          </CardTitle>
          <CardDescription>Digite o CPF do cliente para verificar eventos e vouchers disponíveis</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerificar} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cpf" className="text-sm font-medium">
                CPF
              </label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCpfChange}
                className="w-full transition-all duration-200 focus:scale-[1.01]"
                maxLength={14}
              />
            </div>

            {error && (
              <Alert variant="destructive" className="animate-slide-in-bottom">
                <XCircle className="h-4 w-4 animate-pulse" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full transition-all duration-300 bg-amber-600 hover:bg-amber-700 hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                "Verificar"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Resultado da consulta */}
      {resultado && (
        <div className="space-y-6 animate-fade-in animation-delay-150">
          {/* Informações do cliente */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-amber-900">{resultado.cliente.nome}</CardTitle>
              <CardDescription>CPF: {cpf}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <p className="text-sm text-amber-700">Eventos Ano Anterior</p>
                  <p className="text-2xl font-bold text-amber-900">{resultado.eventos_ano_anterior.length}</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-lg">
                  <p className="text-sm text-amber-700">Eventos Ano Atual</p>
                  <p className="text-2xl font-bold text-amber-900">{resultado.eventos_ano_atual.length}</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-lg">
                  <p className="text-sm text-amber-700">Vouchers Disponíveis</p>
                  <p className="text-2xl font-bold text-amber-900">{resultado.vouchers_disponiveis.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs para eventos e vouchers */}
          <Tabs defaultValue="eventos" className="animate-fade-in animation-delay-300">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="eventos" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Eventos
              </TabsTrigger>
              <TabsTrigger value="vouchers" className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                Vouchers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="eventos" className="space-y-4">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-600" />
                    Eventos do Ano Anterior
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EventosList eventos={resultado.eventos_ano_anterior} />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-600" />
                    Eventos do Ano Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EventosList eventos={resultado.eventos_ano_atual} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vouchers" className="space-y-4">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-amber-600" />
                    Vouchers Disponíveis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resultado.vouchers_disponiveis.map((voucher) => (
                      <VoucherCard key={voucher.id} voucher={voucher} />
                    ))}

                    {resultado.vouchers_disponiveis.length === 0 && (
                      <p className="text-gray-500 col-span-2 text-center py-4">Nenhum voucher disponível</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-amber-600" />
                    Vouchers Utilizados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resultado.vouchers_utilizados.map((voucher) => (
                      <VoucherCard key={voucher.id} voucher={voucher} />
                    ))}

                    {resultado.vouchers_utilizados.length === 0 && (
                      <p className="text-gray-500 col-span-2 text-center py-4">Nenhum voucher utilizado</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Geração de voucher */}
          {resultado.pode_gerar_voucher && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm animate-pulse-slow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Pizza className="h-5 w-5 text-amber-600" />
                  Gerar Novo Voucher
                </CardTitle>
                <CardDescription>
                  Você pode gerar até {resultado.quantidade_disponivel} voucher(s) com base nos eventos do ano anterior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleGerarVoucher}
                  className="w-full transition-all duration-300 bg-amber-600 hover:bg-amber-700 hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isGeneratingVoucher}
                >
                  {isGeneratingVoucher ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando voucher...
                    </>
                  ) : (
                    <>
                      <Ticket className="mr-2 h-4 w-4" />
                      Gerar Voucher Promocional
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Voucher recém-gerado */}
          {voucherGerado && (
            <div className="animate-scale-in">
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle2 className="h-4 w-4 text-green-600 animate-bounce" />
                <AlertTitle>Voucher Gerado com Sucesso!</AlertTitle>
                <AlertDescription>Seu voucher promocional foi gerado e já está disponível para uso.</AlertDescription>
              </Alert>

              <div className="mt-4">
                <VoucherCard voucher={voucherGerado} highlight />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
