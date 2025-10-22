"use client"

import { useState } from "react"
import { Gift, Loader2, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { generateVoucher } from "@/lib/api"
import type { Voucher } from "@/lib/types"

interface VoucherGeneratorProps {
  clientCpfCnpj: string
  availablePoints: number
  onVoucherGenerated?: () => void
}

export function VoucherGenerator({ 
  clientCpfCnpj, 
  availablePoints,
  onVoucherGenerated 
}: VoucherGeneratorProps) {
  const [pointsToUse, setPointsToUse] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [generatedVoucher, setGeneratedVoucher] = useState<Voucher | null>(null)

  const handleGenerate = async () => {
    setError("")
    setGeneratedVoucher(null)

    // Validações
    const points = parseFloat(pointsToUse)
    
    if (!pointsToUse || isNaN(points)) {
      setError("Por favor, informe quantos pontos deseja usar")
      return
    }

    if (points <= 0) {
      setError("Você deve usar pelo menos 0.1 pontos")
      return
    }

    if (points > availablePoints) {
      setError(`Você só tem ${availablePoints.toFixed(1)} pontos disponíveis`)
      return
    }

    // Máximo de pontos por voucher (opcional)
    if (points > 10) {
      setError("Você pode usar no máximo 10 pontos por voucher")
      return
    }

    setIsGenerating(true)

    try {
      const voucher = await generateVoucher({
        clientCpfCnpj,
        pointsToUse: points
      })

      setGeneratedVoucher(voucher)
      setPointsToUse("")
      
      // Callback para atualizar os dados da página pai
      if (onVoucherGenerated) {
        onVoucherGenerated()
      }
    } catch (err) {
      console.error("Erro ao gerar voucher:", err)
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
    <Card className="border-2 border-red-200 bg-gradient-to-br from-white to-red-50">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Gift className="h-6 w-6 text-red-600" />
          Gerar Voucher de Desconto
        </CardTitle>
        <CardDescription className="text-base">
          Use seus pontos para criar um voucher e ganhar desconto no próximo evento!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voucher gerado com sucesso */}
        {generatedVoucher && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 font-semibold">
              Voucher Gerado com Sucesso! 🎉
            </AlertTitle>
            <AlertDescription className="space-y-2">
              <div className="mt-2 p-4 bg-white rounded-lg border border-green-200">
                <div className="text-center mb-2">
                  <div className="text-sm text-gray-600 mb-1">Código do Voucher</div>
                  <div className="text-3xl font-bold text-green-700 tracking-wider font-mono">
                    {generatedVoucher.code}
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1 mt-3">
                  <p>💰 Desconto: <strong>{generatedVoucher.discountPercentage}%</strong></p>
                  <p>📅 Válido até: <strong>{new Date(generatedVoucher.expiresAt).toLocaleDateString('pt-BR')}</strong></p>
                  <p className="mt-2 text-xs text-gray-500">
                    Anote este código e use no seu próximo evento!
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Informações */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Como funciona:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>1 ponto = 1 pessoa de desconto no próximo evento</li>
                <li>Você escolhe quantos pontos quer usar</li>
                <li>O voucher é válido por 1 ano</li>
                <li>Use o código gerado ao fazer seu próximo contrato</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="points" className="text-base font-semibold">
              Quantos pontos você quer usar?
            </Label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="points"
                  type="text"
                  placeholder="Ex: 2.5"
                  value={pointsToUse}
                  onChange={(e) => handlePointsChange(e.target.value)}
                  className="text-lg h-12"
                  disabled={isGenerating || availablePoints === 0}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Disponível: <strong>{availablePoints.toFixed(1)} pontos</strong>
                </p>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || availablePoints === 0 || !pointsToUse}
                className="bg-red-600 hover:bg-red-700 h-12 px-8 text-base"
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
          {pointsValue > 0 && pointsValue <= availablePoints && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                ✨ <strong>Desconto estimado:</strong> Você terá direito a levar{" "}
                <strong className="text-red-600">{pointsValue.toFixed(1)} {pointsValue === 1 ? 'pessoa' : 'pessoas'} extras</strong> no seu próximo evento!
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

          {/* Sem pontos */}
          {availablePoints === 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Sem pontos disponíveis</AlertTitle>
              <AlertDescription>
                Você não tem pontos suficientes para gerar um voucher. Complete mais eventos para acumular pontos!
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Botões de atalho */}
        {availablePoints > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Atalhos:</p>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 5].map((value) => (
                value <= availablePoints && (
                  <Button
                    key={value}
                    variant="outline"
                    size="sm"
                    onClick={() => setPointsToUse(value.toString())}
                    disabled={isGenerating}
                    className="border-red-200 hover:bg-red-50 hover:border-red-300"
                  >
                    {value} {value === 1 ? 'ponto' : 'pontos'}
                  </Button>
                )
              ))}
              {availablePoints > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPointsToUse(availablePoints.toFixed(1))}
                  disabled={isGenerating}
                  className="border-red-300 hover:bg-red-100 hover:border-red-400 font-semibold"
                >
                  Todos ({availablePoints.toFixed(1)})
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
