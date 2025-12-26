import { CpfVerificationForm } from "@/components/cpf-verification-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Seção da imagem comercial (33%) */}
      <div className="w-full md:w-1/3 bg-gradient-to-br from-red-600 via-red-700 to-orange-600 flex flex-col items-center justify-center p-6 shadow-2xl">
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
            <h2 className="text-3xl font-bold text-orange-400">Verificação de Benefícios</h2>
            <p className="text-gray-300 mt-2">
              Verifique se você tem direito a um voucher de desconto para seu proxímo evento!!!
            </p>
          </div>

          <CpfVerificationForm />
        </div>
      </div>
    </main>
  )
}
