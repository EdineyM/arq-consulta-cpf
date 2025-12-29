"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react"
import type { Voucher } from "@/lib/types"

interface VouchersListProps {
  vouchers: Voucher[]
}

export function VouchersList({ vouchers }: VouchersListProps) {
  if (vouchers.length === 0) {
    return (
      <Card className="bg-slate-800 border-2 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 text-red-400">
            <Gift className="h-6 w-6 text-red-500" />
            Meus Vouchers
          </CardTitle>
          <CardDescription className="text-gray-400">
            Você ainda não possui vouchers de desconto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-center py-8">
            Realize eventos e ganhe vouchers de desconto para usar no próximo!
          </p>
        </CardContent>
      </Card>
    )
  }

  const activeVouchers = vouchers.filter(v => v.isActive && !v.isUsed && new Date(v.expiresAt) > new Date())
  const usedVouchers = vouchers.filter(v => v.isUsed)
  const expiredVouchers = vouchers.filter(v => !v.isUsed && new Date(v.expiresAt) <= new Date())

  return (
    <Card className="bg-slate-800 border-2 border-red-500/30">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2 text-red-400">
          <Gift className="h-6 w-6 text-red-500" />
          Meus Vouchers
        </CardTitle>
        <CardDescription className="text-gray-400">
          Seus códigos de desconto disponíveis e histórico
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Vouchers Ativos */}
        {activeVouchers.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Disponíveis ({activeVouchers.length})
            </h3>
            <div className="grid gap-3">
              {activeVouchers.map((voucher) => (
                <div 
                  key={voucher.id} 
                  className="bg-slate-700 border-2 border-green-500/50 rounded-lg p-4 hover:border-green-500 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl font-bold text-green-400 font-mono tracking-wider">
                          {voucher.code}
                        </div>
                        <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                          {voucher.discountPercentage}% OFF
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          Válido até {new Date(voucher.expiresAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <p className="text-xs text-gray-400">
                      💡 Use este código ao preencher o formulário de orçamento
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vouchers Usados */}
        {usedVouchers.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-400 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Utilizados ({usedVouchers.length})
            </h3>
            <div className="grid gap-3">
              {usedVouchers.map((voucher) => (
                <div 
                  key={voucher.id} 
                  className="bg-slate-700/50 border border-gray-600 rounded-lg p-4 opacity-60"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-xl font-bold text-gray-400 font-mono tracking-wider line-through">
                          {voucher.code}
                        </div>
                        <div className="bg-gray-600/50 text-gray-400 px-3 py-1 rounded-full text-sm">
                          {voucher.discountPercentage}% OFF
                        </div>
                        <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-semibold">
                          USADO
                        </div>
                      </div>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>Criado em {new Date(voucher.createdAt).toLocaleDateString('pt-BR')}</div>
                        {voucher.contract?.contractNumber && (
                          <div className="flex items-center gap-1 text-blue-400">
                            <span>📋</span>
                            <span>Usado no contrato: <span className="font-semibold">{voucher.contract.contractNumber}</span></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vouchers Expirados */}
        {expiredVouchers.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Expirados ({expiredVouchers.length})
            </h3>
            <div className="grid gap-3">
              {expiredVouchers.map((voucher) => (
                <div 
                  key={voucher.id} 
                  className="bg-slate-700/50 border border-red-500/30 rounded-lg p-4 opacity-60"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-xl font-bold text-gray-400 font-mono tracking-wider line-through">
                          {voucher.code}
                        </div>
                        <div className="bg-gray-600/50 text-gray-400 px-3 py-1 rounded-full text-sm">
                          {voucher.discountPercentage}% OFF
                        </div>
                        <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-semibold">
                          EXPIRADO
                        </div>
                      </div>
                      <div className="text-sm text-red-400">
                        Expirou em {new Date(voucher.expiresAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
