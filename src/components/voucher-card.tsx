import { Card, CardContent } from "@/components/ui/card"
import { Ticket, CheckCircle, XCircle } from "lucide-react"

interface Voucher {
  id: number
  code: string
  cpf: string
  value: number
  // data_geracao: string
  // percentual_desconto: number
  utilized: boolean
  date_used: boolean
  date_expiration: string
  date_generated: string
}

interface VoucherCardProps {
  voucher: Voucher
  highlight?: boolean
}

export function VoucherCard({ voucher, highlight = false }: VoucherCardProps) {
  // Formatar datas
  const dataGeracao = new Date(voucher.date_generated).toLocaleDateString("pt-BR")
  const dataExpiracao = new Date(voucher.date_expiration).toLocaleDateString("pt-BR")

  // Formatar valor
  const valorFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(voucher.value)

  return (
    <Card
      className={`overflow-hidden border-0 ${
        highlight ? "animate-pulse-slow shadow-xl ring-2 ring-red-500" : "shadow-md"
      }`}
    >
      <div className="bg-gradient-to-r from-red-600 to-red-500 p-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            <span className="font-bold">{voucher.code}</span>
          </div>
          {voucher.utilized ? (
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
              <CheckCircle className="h-3 w-3" />
              <span>Utilizado</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
              <XCircle className="h-3 w-3" />
              <span>Não utilizado</span>
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Valor:</span>
            <span className="font-bold text-gray-900">{valorFormatado}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Gerado em:</span>
            <span className="text-gray-700">{dataGeracao}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Válido até:</span>
            <span className="text-gray-700">{dataExpiracao}</span>
          </div>

          {highlight && (
            <div className="mt-3 pt-3 border-t border-dashed border-red-200 text-center">
              <p className="text-sm text-red-700 font-medium">Apresente este código na sua próxima compra!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
