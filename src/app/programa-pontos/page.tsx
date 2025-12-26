"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, ArrowLeft, Trophy, Calendar, Users, Gift, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Client, Contract, PointsSummary, Voucher } from "@/lib/types"
import { getClientByCpf, getContractsByClientCpf, calculateAvailablePoints, formatCpfCnpj, getClientVouchers } from "@/lib/api"
import { EventsList } from "@/components/events-list"
import { VoucherGenerator } from "@/components/voucher-generator-pontos"
import { VouchersList } from "@/components/vouchers-list"

export default function ProgramaPontosPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cpf = searchParams.get("cpf")

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [client, setClient] = useState<Client | null>(null)
  const [contracts, setContracts] = useState<Contract[]>([])
  const [pointsSummary, setPointsSummary] = useState<PointsSummary | null>(null)
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [showEventsHistory, setShowEventsHistory] = useState(false)

  useEffect(() => {
    if (!cpf) {
      router.push("/")
      return
    }

    loadClientData()
  }, [cpf])

  const loadClientData = async () => {
    if (!cpf) return

    setIsLoading(true)
    setError("")

    try {
      // Buscar dados do cliente
      const clientData = await getClientByCpf(cpf)
      if (!clientData) {
        setError("Cliente não encontrado")
        return
      }
      setClient(clientData)

      // Buscar contratos do cliente
      const contractsPage = await getContractsByClientCpf(cpf)
      const allContracts = contractsPage.content
      setContracts(allContracts)

      // Calcular pontos disponíveis
      const summary = calculateAvailablePoints(allContracts)
      setPointsSummary(summary)

      // Buscar vouchers do cliente
      const clientVouchers = await getClientVouchers(cpf)
      setVouchers(clientVouchers)
    } catch (err) {
      console.error("Erro ao carregar dados:", err)
      setError("Erro ao carregar seus dados. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-500 mx-auto mb-4" />
          <p className="text-gray-300">Carregando seus dados...</p>
        </div>
      </div>
    )
  }

  if (error || !client || !pointsSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-4">
        <Card className="max-w-md w-full bg-slate-800 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-500">Erro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertTitle>Ops!</AlertTitle>
              <AlertDescription>
                {error || "Não foi possível carregar seus dados."}
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => router.push("/")} 
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/")}
            className="mb-4 hover:bg-slate-700 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="bg-slate-800 border-2 border-red-500/30 rounded-lg shadow-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Programa de Pontos
                </h1>
                <p className="text-gray-300">
                  Olá, <span className="font-semibold text-red-500">{client.name}</span>!
                </p>
                <p className="text-sm text-gray-400">
                  CPF: {client.cpfCnpj ? formatCpfCnpj(client.cpfCnpj) : cpf ? formatCpfCnpj(cpf) : 'Não informado'}
                </p>
              </div>
              <Trophy className="h-12 w-12 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Resumo de Pontos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Vouchers Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {vouchers.filter(v => v.isActive && !v.isUsed && new Date(v.expiresAt) > new Date()).length}
              </div>
              <p className="text-red-100 text-sm mt-1">
                {vouchers.filter(v => v.isActive && !v.isUsed && new Date(v.expiresAt) > new Date()).length === 1 ? 'voucher ativo' : 'vouchers ativos'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-2 border-red-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-red-400">
                <Calendar className="h-5 w-5 text-red-500" />
                Eventos Realizados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                {pointsSummary.totalEvents}
              </div>
              <p className="text-gray-400 text-sm mt-1">
                Festas completadas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-2 border-red-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-red-400">
                <Users className="h-5 w-5 text-red-500" />
                Total de Convidados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">
                {pointsSummary.completedContracts.reduce((sum, c) => sum + c.numberTotalOfGuests, 0)}
              </div>
              <p className="text-gray-400 text-sm mt-1">
                Em todos os eventos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gerador de Voucher e Lista */}
        <Tabs defaultValue="gerar" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800 border border-red-500/30">
            <TabsTrigger 
              value="gerar" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              🎁 Gerar Voucher
            </TabsTrigger>
            <TabsTrigger 
              value="meus" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              📝 Meus Vouchers
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="gerar" className="mt-6">
            <VoucherGenerator 
              clientCpfCnpj={cpf || ''}
              availablePoints={pointsSummary.totalPoints}
              hasEventVoucher={pointsSummary.totalEvents > 0}
              hasReferralVoucher={false}
              onVoucherGenerated={loadClientData}
            />
          </TabsContent>
          
          <TabsContent value="meus" className="mt-6">
            <VouchersList vouchers={vouchers} />
          </TabsContent>
        </Tabs>

        {/* Lista de Eventos */}
        <div>
          <Button
            variant="outline"
            onClick={() => setShowEventsHistory(!showEventsHistory)}
            className="w-full bg-slate-800 border-2 border-red-500/30 hover:bg-slate-700 hover:border-red-500 text-gray-300 hover:text-white mb-4"
          >
            <Calendar className="mr-2 h-5 w-5 text-red-500" />
            {showEventsHistory ? 'Ocultar' : 'Ver'} Histórico de Eventos ({pointsSummary.completedContracts.length})
            {showEventsHistory ? <ChevronUp className="ml-auto h-5 w-5" /> : <ChevronDown className="ml-auto h-5 w-5" />}
          </Button>
          
          {showEventsHistory && (
            <EventsList contracts={pointsSummary.completedContracts} />
          )}
        </div>
      </div>
    </main>
  )
}
