import { formatCurrency, formatDate } from "@/lib/utils"

interface Evento {
  id: number
  data_evento: string
  tipo_evento: string
  valor: number
}

interface EventosListProps {
  eventos: Evento[]
}

export function EventosList({ eventos }: EventosListProps) {
  if (eventos.length === 0) {
    return <p className="text-gray-500 text-center py-4">Nenhum evento encontrado neste período</p>
  }

  return (
    <div className="space-y-3">
      {eventos.map((evento) => (
        <div
          key={evento.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
        >
          <div className="flex-1">
            <h4 className="font-medium text-amber-900">{evento.tipo_evento}</h4>
            <p className="text-sm text-amber-700">{formatDate(evento.data_evento)}</p>
          </div>
          <div className="mt-2 sm:mt-0">
            <span className="font-bold text-amber-900">{formatCurrency(evento.valor)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
