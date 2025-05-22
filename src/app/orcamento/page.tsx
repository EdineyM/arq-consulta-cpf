"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Pizza, Send, User, Mail, Phone, MapPin, Users, CalendarIcon, Ticket } from "lucide-react"
import { PizzaBackground } from "@/components/pizza-background"
import Link from "next/link"

export default function OrcamentoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    whatsapp: "",
    regiao: "Rio de Janeiro/RJ",
    cidade: "",
    dataEvento: "",
    numeroPessoas: "",
    comoConheceu: "Google ou outro buscador",
    codigoIndicacao: "", // Novo campo para código de indicação
    aceitaTermos: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, aceitaTermos: e.target.checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    // Validação básica
    if (
      !formData.nome ||
      !formData.email ||
      !formData.telefone ||
      !formData.cidade ||
      !formData.dataEvento ||
      !formData.numeroPessoas
    ) {
      setFormError("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    if (!formData.aceitaTermos) {
      setFormError("Você precisa aceitar os termos de privacidade para continuar.")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Sucesso
      setFormSuccess(true)

      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      setFormError("Ocorreu um erro ao enviar seu orçamento. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF0] flex flex-col items-center justify-center p-4 relative">
      {/* Background decorativo */}
      <PizzaBackground />

      <div className="w-full max-w-4xl z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Solicite um Orçamento</h1>
          <p className="text-lg text-gray-600">
            Solicite abaixo seu orçamento de forma simples e rápida, recebendo em seu e-mail nossa proposta comercial.
          </p>
        </div>

        {formSuccess ? (
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm animate-scale-in">
            <CardContent className="pt-6 flex flex-col items-center justify-center p-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Pizza className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Orçamento Enviado com Sucesso!</h3>
              <p className="text-gray-600 text-center mb-6">
                Recebemos seu pedido de orçamento. Em breve, nossa equipe entrará em contato através do e-mail
                informado.
              </p>
              <p className="text-sm text-gray-500">Redirecionando para a página inicial em alguns segundos...</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl flex items-center gap-2 text-gray-900">
                <Calendar className="h-6 w-6 text-red-600" />
                Dados para Orçamento
              </CardTitle>
              <CardDescription>Preencha os campos abaixo para receber seu orçamento personalizado</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-amber-600" />
                    Dados Pessoais
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="nome" className="text-sm font-medium block">
                        Nome <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="nome"
                          name="nome"
                          placeholder="Seu nome completo"
                          value={formData.nome}
                          onChange={handleInputChange}
                          className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                        />
                        <User className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium block">
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                        />
                        <Mail className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="telefone" className="text-sm font-medium block">
                        Telefone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="telefone"
                          name="telefone"
                          placeholder="(00) 00000-0000"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                        />
                        <Phone className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="text-sm font-medium block">
                        WhatsApp (Opcional)
                      </label>
                      <div className="relative">
                        <Input
                          id="whatsapp"
                          name="whatsapp"
                          placeholder="(00) 00000-0000"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                        />
                        <Phone className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Localização */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-amber-600" />
                    Localização
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="regiao" className="text-sm font-medium block">
                        Região <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="regiao"
                          name="regiao"
                          value={formData.regiao}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 transition-all duration-200 focus:scale-[1.01]"
                        >
                          <option value="Rio de Janeiro/RJ">Rio de Janeiro/RJ</option>
                          <option value="São Paulo/SP">São Paulo/SP</option>
                          <option value="Belo Horizonte/MG">Belo Horizonte/MG</option>
                          <option value="Outra">Outra</option>
                        </select>
                        <MapPin className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="cidade" className="text-sm font-medium block">
                        Qual sua cidade? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="cidade"
                          name="cidade"
                          placeholder="Nome da sua cidade"
                          value={formData.cidade}
                          onChange={handleInputChange}
                          className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                        />
                        <MapPin className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detalhes do Evento */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-amber-600" />
                    Detalhes do Evento
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="dataEvento" className="text-sm font-medium block">
                        Data do Evento <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="dataEvento"
                          name="dataEvento"
                          type="date"
                          value={formData.dataEvento}
                          onChange={handleInputChange}
                          className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                        />
                        <CalendarIcon className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="numeroPessoas" className="text-sm font-medium block">
                        Número de pessoas <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="numeroPessoas"
                          name="numeroPessoas"
                          type="number"
                          placeholder="Ex: 50"
                          value={formData.numeroPessoas}
                          onChange={handleInputChange}
                          className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                        />
                        <Users className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="comoConheceu" className="text-sm font-medium block">
                        Como conheceu?
                      </label>
                      <div className="relative">
                        <select
                          id="comoConheceu"
                          name="comoConheceu"
                          value={formData.comoConheceu}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 transition-all duration-200 focus:scale-[1.01]"
                        >
                          <option value="Google ou outro buscador">Google ou outro buscador</option>
                          <option value="Redes Sociais">Redes Sociais</option>
                          <option value="Indicação de amigos">Indicação de amigos</option>
                          <option value="Já sou cliente">Já sou cliente</option>
                          <option value="Outro">Outro</option>
                        </select>
                        <Users className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="codigoIndicacao" className="text-sm font-medium block">
                        Código de Indicação (se possuir)
                      </label>
                      <div className="relative">
                        <Input
                          id="codigoIndicacao"
                          name="codigoIndicacao"
                          placeholder="Ex: AMIGO123"
                          value={formData.codigoIndicacao}
                          onChange={handleInputChange}
                          className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                        />
                        <Ticket className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Termos de Privacidade */}
                <div className="flex items-start space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="termos"
                    checked={formData.aceitaTermos}
                    onChange={handleCheckboxChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="termos" className="text-sm font-medium leading-tight">
                    Estou de acordo com os{" "}
                    <Link href="/termos-privacidade" className="text-red-600 hover:underline">
                      Termos de Privacidade
                    </Link>
                    .
                  </label>
                </div>

                {/* Mensagem de erro */}
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {formError}
                  </div>
                )}

                {/* Botões */}
                <div className="space-y-4 pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 transform transition-all duration-500 opacity-20 group-hover:opacity-30 group-hover:-translate-x-2">
                      <Pizza className="h-16 w-16 text-white" />
                    </div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Enviar Orçamento
                        </>
                      )}
                    </span>
                    <div className="absolute -right-10 top-1/2 -translate-y-1/2 transform transition-all duration-500 opacity-20 group-hover:opacity-30 group-hover:translate-x-2">
                      <Pizza className="h-16 w-16 text-white" />
                    </div>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-50"
                    onClick={() => router.push("/")}
                  >
                    Voltar para a página inicial
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
