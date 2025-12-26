"use client"

import { useState, useEffect } from "react"
import { Gift, Loader2, Sparkles, AlertCircle, CheckCircle2, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { generateVoucher } from "@/lib/api"
import type { Voucher } from "@/lib/types"

interface VoucherGeneratorProps {
  clientCpfCnpj: string
  availablePoints: number
  hasEventVoucher: boolean
  hasReferralVoucher: boolean
  onVoucherGenerated?: () => void
}

export function VoucherGenerator({ 
  clientCpfCnpj, 
  availablePoints,
  hasEventVoucher,
  hasReferralVoucher,
  onVoucherGenerated 
}: VoucherGeneratorProps) {
  const [pointsToUse, setPointsToUse] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [generatedVoucher, setGeneratedVoucher] = useState<Voucher | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    console.log('🔵 Estado do modal mudou:', { showSuccessModal, generatedVoucher })
  }, [showSuccessModal, generatedVoucher])

  const handleGenerate = async () => {
    setError("")
    setGeneratedVoucher(null)

    // Validações
    const points = parseFloat(pointsToUse)
    
    if (!pointsToUse || isNaN(points)) {
      setError("Por favor, selecione a porcentagem de desconto")
      return
    }

    if (points !== 5 && points !== 2) {
      setError("Escolha 5% (se você fez um evento) ou 2% (se você indicou alguém)")
      return
    }

    setIsGenerating(true)

    try {
      console.log('🟡 Iniciando criação do voucher...', { cpfCnpj: clientCpfCnpj, points })
      const voucher = await generateVoucher({
        cpfCnpj: clientCpfCnpj,
        points: points
      })

      console.log('🟢 Voucher recebido:', voucher)
      setGeneratedVoucher(voucher)
      console.log('🟡 Abrindo modal...', { showSuccessModal: true })
      setShowSuccessModal(true)
      setPointsToUse("")
      
      // Callback para atualizar os dados da página pai
      if (onVoucherGenerated) {
        onVoucherGenerated()
      }
    } catch (err) {
      console.error("🔴 Erro ao gerar voucher:", err)
      setError(err instanceof Error ? err.message : "Erro ao gerar voucher. Tente novamente.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePointsChange = (value: string) => {
    // Permitir apenas números e ponto decimal
    const cleaned = value.replace(/[^\d.]/g, "")
    
    // Evitar múltiplos pontos decimais
    const parts = cleaned.split(".")
    if (parts.length > 2) {
      return
    }
    
    // Limitar casas decimais a 1
    if (parts[1] && parts[1].length > 1) {
      return
    }
    
    setPointsToUse(cleaned)
  }

  const pointsValue = parseFloat(pointsToUse) || 0

  return (
    <>
      {/* Modal de Sucesso */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-slate-800 border-2 border-red-500/50 text-white sm:max-w-md z-[9999]">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-500/20 p-3">
                <PartyPopper className="h-12 w-12 text-green-400" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center text-green-400">
              Voucher Criado com Sucesso! 🎉
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300">
              Guarde bem este código para usar no seu próximo evento
            </DialogDescription>
          </DialogHeader>
          
          {generatedVoucher && (
            <div className="space-y-4">
              {/* Código do Voucher */}
              <div className="p-6 bg-slate-900 rounded-lg border-2 border-green-500/50">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Seu Código de Desconto</div>
                  <div className="text-4xl font-bold text-green-400 tracking-wider font-mono mb-4">
                    {generatedVoucher.code}
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="flex items-center justify-center gap-2">
                      <span className="text-2xl">💰</span>
                      <strong className="text-red-400">{generatedVoucher.discountPercentage}% de desconto</strong>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <span className="text-2xl">📅</span>
                      Válido até: <strong>{new Date(generatedVoucher.expiresAt).toLocaleDateString('pt-BR')}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Instruções */}
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
                <p className="text-sm text-gray-300 font-semibold mb-2 text-center">
                  📝 Como usar seu voucher:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                  <li>Ao preencher o <strong className="text-red-400">formulário de orçamento</strong>, informe este código</li>
                  <li>O desconto será aplicado automaticamente no valor total</li>
                  <li>Este código só pode ser usado uma vez</li>
                </ol>
              </div>

              {/* Botão para fechar */}
              <Button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Entendi!
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Card className="border-2 border-red-500/30 bg-slate-800 shadow-lg shadow-red-500/20">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2 text-red-400">
          <Gift className="h-6 w-6 text-red-500" />
          Gerar Voucher de Desconto
        </CardTitle>
        <CardDescription className="text-base text-gray-300">
          Gere um voucher de 5% de desconto para usar no seu próximo evento!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Informações */}
        <div className="bg-slate-700 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-red-400 mt-0.5" />
            <div className="text-sm text-gray-300">
              <p className="font-semibold mb-1 text-red-400">Como funciona:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Quem fez evento: ganhe 5% de desconto no próximo</li>
                <li>Quem indicou alguém: ganhe 2% de desconto</li>
                <li>O voucher é válido por 12 meses</li>
                <li>Use o código gerado ao fazer seu próximo contrato</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="points" className="text-base font-semibold text-red-400">
              Selecione a porcentagem de desconto:
            </Label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="points"
                  type="text"
                  placeholder="5 para 5% de desconto"
                  value={pointsToUse}
                  onChange={(e) => handlePointsChange(e.target.value)}
                  className="text-lg h-12 bg-slate-700 border-red-500/50 text-white"
                  disabled={isGenerating || availablePoints === 0}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Você pode gerar vouchers de <strong>5%</strong> (evento) ou <strong>2%</strong> (indicação)
                </p>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || availablePoints === 0 || !pointsToUse}
                className="bg-red-600 hover:bg-red-700 h-12 px-8 text-base shadow-lg hover:shadow-red-500/50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Gift className="mr-2 h-5 w-5" />
                    Gerar
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Preview do desconto */}
          {pointsValue > 0 && (pointsValue === 5 || pointsValue === 2) && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                ✨ <strong>Desconto estimado:</strong> Você terá{" "}
                <strong className="text-red-400">{pointsValue}% de desconto</strong> no valor total do seu próximo evento!
              </p>
            </div>
          )}

          {/* Erro */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Sem eventos */}
          {availablePoints === 0 && (
            <Alert className="bg-slate-700 border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertTitle className="text-red-400">Sem eventos anteriores</AlertTitle>
              <AlertDescription className="text-gray-300">
                Você ainda não realizou eventos conosco. Faça seu primeiro evento e ganhe 5% de desconto no próximo!
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Botões de atalho */}
        {availablePoints > 0 && (hasEventVoucher || hasReferralVoucher) && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-red-400">Atalhos:</p>
            <div className="flex flex-wrap gap-2">
              {hasEventVoucher && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPointsToUse('5')}
                  disabled={isGenerating}
                  className="border-red-500/50 hover:bg-red-600 hover:border-red-500 text-gray-300 hover:text-white bg-slate-700"
                >
                  5% (Fez evento)
                </Button>
              )}
              {hasReferralVoucher && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPointsToUse('2')}
                  disabled={isGenerating}
                  className="border-red-500/50 hover:bg-red-600 hover:border-red-500 text-gray-300 hover:text-white bg-slate-700"
                >
                  2% (Indicação)
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </>
  )
}
