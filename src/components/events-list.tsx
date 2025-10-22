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
      <Card>
        <CardContent className="py-8">
          <p className="text-gray-500 text-center">Nenhum evento finalizado encontrado</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Calendar className="h-5 w-5 text-red-600" />
          Histórico de Eventos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contracts.map((contract) => {
          const points = calculateContractPoints(contract)
          
          return (
            <div
              key={contract.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Informações principais */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        Contrato #{contract.contractNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {contract.eventType || "Festa"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                      <Trophy className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        +{points.toFixed(1)} pts
                      </span>
                    </div>
                  </div>

                  {/* Data do evento */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">
                      {formatDate(contract.eventDate)}
                    </span>
                  </div>

                  {/* Número de convidados */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4 text-red-600" />
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
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-red-600 mt-0.5" />
                      <span className="text-sm">
                        {contract.address.street}, {contract.address.number}
                        {contract.address.complement && ` - ${contract.address.complement}`}
                        <br />
                        {contract.address.neighborhood}, {contract.address.city} - {contract.address.state}
                      </span>
                    </div>
                  )}
                </div>

                {/* Valor do contrato */}
                <div className="lg:text-right">
                  <div className="text-sm text-gray-500 mb-1">Valor do evento</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {formatCurrency(contract.finalPrice)}
                  </div>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      contract.statusPayment === 'PAID' 
                        ? 'bg-green-100 text-green-700'
                        : contract.statusPayment === 'PARTIAL'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {contract.statusPayment === 'PAID' && 'Pago'}
                      {contract.statusPayment === 'PARTIAL' && 'Pagamento Parcial'}
                      {contract.statusPayment === 'PENDING' && 'Pendente'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resumo de pontos */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  💡 <strong>Como calculamos:</strong> {contract.numberTotalOfGuests} pessoas × 5% = {points.toFixed(1)} pontos
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
