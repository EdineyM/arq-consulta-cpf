import { CpfVerificationForm } from "@/components/cpf-verification-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col md:flex-row bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Seção da imagem comercial (33%) */}
      <div className="w-full md:w-1/3 bg-red-600 flex flex-col items-center justify-center p-6">
        <div className="relative w-full h-48 md:h-80">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <img src={"/logo-pizza.png"} alt="Arquitetos da Pizza" className="w-60 h-60 mb-4" />
            <h2 className="text-2xl font-bold text-center">Arquitetos da Pizza</h2>
            <p className="text-center mt-2">A festa da pizza na sua casa!!</p>
          </div>
        </div>
      </div>

      {/* Seção do formulário de verificação (67%) */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Verificação de Benefícios</h1>
            <p className="text-gray-600 mt-2">
              Verifique se você tem direito a levar duas pessoas extras na sua proxima festa!!
            </p>
          </div>

          <CpfVerificationForm />
        </div>
      </div>
    </main>
  )
}
