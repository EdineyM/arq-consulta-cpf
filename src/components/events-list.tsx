import { Calendar, Users, MapPin, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Contract } from "@/lib/types"
import { formatDate, formatCurrency, calculateContractPoints } from "@/lib/api"

interface EventsListProps {
  contracts: Contract[]
}

export function EventsList({ contracts }: EventsListProps) {
  if (contracts.length === 0) {
    return (
      <Card className="bg-slate-800 border-2 border-red-500/30">
        <CardContent className="py-8">
          <p className="text-gray-400 text-center">Nenhum evento finalizado encontrado</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800 border-2 border-red-500/30">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2 text-red-400">
          <Calendar className="h-5 w-5 text-red-500" />
          Histórico de Eventos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contracts.map((contract) => {
          const points = calculateContractPoints(contract)
          
          return (
            <div
              key={contract.id}
              className="border-2 border-red-500/20 rounded-lg p-4 hover:shadow-lg hover:shadow-red-500/20 transition-shadow bg-slate-700"
            >
              <div className="flex flex-col gap-4">
                {/* Informações principais */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        Contrato #{contract.contractNumber}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {contract.eventType || "Festa"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-red-600 px-3 py-1 rounded-full">
                      <Trophy className="h-4 w-4 text-white" />
                      <span className="text-sm font-semibold text-white">
                        5% de desconto
                      </span>
                    </div>
                  </div>

                  {/* Data do evento */}
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">
                      {formatDate(contract.eventDate)}
                    </span>
                  </div>

                  {/* Número de convidados */}
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="h-4 w-4 text-red-500" />
                    <span className="text-sm">
                      <strong>{contract.numberTotalOfGuests}</strong> convidados
                      {" - "}
                      {contract.numberOfGuestsAdults} adultos
                      {contract.numberOfGuestsChildren > 0 && `, ${contract.numberOfGuestsChildren} crianças`}
                      {contract.numberOfGuestsTeenagers > 0 && `, ${contract.numberOfGuestsTeenagers} adolescentes`}
                      {contract.numberOfGuestsBabies > 0 && `, ${contract.numberOfGuestsBabies} bebês`}
                    </span>
                  </div>

                  {/* Endereço */}
                  {contract.address && (
                    <div className="flex items-start gap-2 text-gray-300">
                      <MapPin className="h-4 w-4 text-red-500 mt-0.5" />
                      <span className="text-sm">
                        {contract.address.street}, {contract.address.number}
                        {contract.address.complement && ` - ${contract.address.complement}`}
                        <br />
                        {contract.address.neighborhood}, {contract.address.city} - {contract.address.state}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
