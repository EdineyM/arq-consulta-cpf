"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { verifyCpf } from "@/app/actions"

export function CpfVerificationForm() {
  const [cpf, setCpf] = useState("")
  const [result, setResult] = useState<{ eligible: boolean; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Format CPF as user types (XXX.XXX.XXX-XX)
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "") // Remove non-digits

    if (value.length > 11) {
      value = value.slice(0, 11)
    }

    // Format with dots and dash
    if (value.length > 9) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}.${value.slice(3)}`
    }

    setCpf(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const cleanCpf = cpf.replace(/\D/g, "")
    if (cleanCpf.length !== 11) {
      setError("CPF deve conter 11 dígitos")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await verifyCpf(cleanCpf)
      setResult(response)
    } catch (err) {
      setError("Ocorreu um erro ao verificar o CPF. Tente novamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle>Consulta de CPF</CardTitle>
        <CardDescription>
          Digite seu CPF para verificar se você tem direito a levar duas pessoas extras na festa de 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="cpf" className="text-sm font-medium">
              CPF
            </label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
              className="w-full"
              maxLength={14}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert
              variant={result.eligible ? "default" : "destructive"}
              className={result.eligible ? "bg-green-50 text-green-800 border-green-200" : ""}
            >
              {result.eligible ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{result.eligible ? "Parabéns!" : "Não encontrado"}</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
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
      <CardFooter className="text-xs text-gray-500 justify-center">
        Sistema de verificação de benefícios para clientes
      </CardFooter>
    </Card>
  )
}
