"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { XCircle, Loader2, Ticket } from "lucide-react"

export function CpfVerificationForm() {
  const router = useRouter()
  const [cpf, setCpf] = useState("")
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

    // Validação básica do CPF (dígitos verificadores)
    if (!isValidCPF(cleanCpf)) {
      setError("CPF inválido. Por favor, verifique o número informado.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Redirecionar para a página de vouchers com o CPF como parâmetro
      router.push(`/vouchers?cpf=${cleanCpf}`)
    } catch (err) {
      setError("Ocorreu um erro ao processar sua solicitação. Tente novamente.")
      console.error(err)
      setIsLoading(false)
    }
  }

  // Função para validar CPF
  function isValidCPF(cpf: string): boolean {
    // Check if it has 11 digits
    if (cpf.length !== 11) return false

    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cpf)) return false

    // Validate first check digit
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += Number.parseInt(cpf.charAt(i)) * (10 - i)
    }
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cpf.charAt(9))) return false

    // Validate second check digit
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += Number.parseInt(cpf.charAt(i)) * (11 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cpf.charAt(10))) return false

    return true
  }

  return (
    <Card className="shadow-lg border-0 animate-fade-in bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket className="h-5 w-5 text-red-600" />
          Consulta de CPF
        </CardTitle>
        <CardDescription>Digite seu CPF para verificar se você tem direito a vouchers promocionais</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 animate-slide-in-left animation-delay-300">
            <label htmlFor="cpf" className="text-sm font-medium">
              CPF
            </label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
              className="w-full transition-all duration-200 focus:scale-[1.01]"
              maxLength={14}
            />
          </div>

          {error && (
            <Alert variant="destructive" className="animate-slide-in-bottom">
              <XCircle className="h-4 w-4 animate-pulse" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full transition-all duration-300 bg-red-600 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <Ticket className="mr-2 h-4 w-4" />
                Verificar
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-gray-500 justify-center animate-fade-in animation-delay-500">
        Sistema de verificação de benefícios para clientes
      </CardFooter>
    </Card>
  )
}
