import { VoucherDisplay } from "@/components/voucher-display"
import { PizzaBackground } from "@/components/pizza-background"

export default function VouchersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Obter o CPF dos parâmetros da URL
  const cpf = typeof searchParams.cpf === "string" ? searchParams.cpf : ""

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Background com ilustrações de pizza */}
      <PizzaBackground />

      {/* Conteúdo principal */}
      <main className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="animate-fade-in text-4xl font-extrabold text-gray-900 md:text-5xl">
              Seus Vouchers Promocionais
            </h1>
            <p className="animate-fade-in animation-delay-150 mt-2 text-gray-700">
              Aproveite descontos especiais na sua próxima pizza!
            </p>
          </div>

          <VoucherDisplay cpf={cpf} />
        </div>
      </main>
    </div>
  )
}
