"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, ArrowLeft, Trophy, Calendar, Users, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Client, Contract, PointsSummary } from "@/lib/types"
import { getClientByCpf, getContractsByClientCpf, calculateAvailablePoints, formatCpfCnpj } from "@/lib/api"
import { EventsList } from "@/components/events-list"
import { VoucherGenerator } from "@/components/voucher-generator-pontos"

export default function ProgramaPontosPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cpf = searchParams.get("cpf")

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [client, setClient] = useState<Client | null>(null)
  const [contracts, setContracts] = useState<Contract[]>([])
  const [pointsSummary, setPointsSummary] = useState<PointsSummary | null>(null)

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
    } catch (err) {
      console.error("Erro ao carregar dados:", err)
      setError("Erro ao carregar seus dados. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando seus dados...</p>
        </div>
      </div>
    )
  }

  if (error || !client || !pointsSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Erro</CardTitle>
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/")}
            className="mb-4 hover:bg-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Programa de Pontos
                </h1>
                <p className="text-gray-600">
                  Olá, <span className="font-semibold text-red-600">{client.name}</span>!
                </p>
                <p className="text-sm text-gray-500">
                  CPF: {formatCpfCnpj(client.cpfCnpj)}
                </p>
              </div>
              <Trophy className="h-12 w-12 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Resumo de Pontos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Pontos Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {pointsSummary.totalPoints.toFixed(1)}
              </div>
              <p className="text-red-100 text-sm mt-1">
                = {pointsSummary.totalPoints.toFixed(1)} pessoas de desconto
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
                <Calendar className="h-5 w-5 text-red-600" />
                Eventos Realizados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-gray-800">
                {pointsSummary.totalEvents}
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Festas completadas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
                <Users className="h-5 w-5 text-red-600" />
                Total de Convidados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-gray-800">
                {pointsSummary.completedContracts.reduce((sum, c) => sum + c.numberTotalOfGuests, 0)}
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Em todos os eventos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gerador de Voucher */}
        <div className="mb-8">
          <VoucherGenerator 
            clientCpfCnpj={client.cpfCnpj}
            availablePoints={pointsSummary.totalPoints}
            onVoucherGenerated={loadClientData}
          />
        </div>

        {/* Lista de Eventos */}
        <div>
          <EventsList contracts={pointsSummary.completedContracts} />
        </div>
      </div>
    </main>
  )
}
