"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer } from "lucide-react"
import { PizzaBackground } from "@/components/pizza-background"

export default function TermosPrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#FFFBF0] flex flex-col items-center py-8 px-4 relative">
      {/* Background decorativo */}
      <PizzaBackground />

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-600/10 to-transparent pointer-events-none" />

      <div className="absolute -left-20 top-1/4 w-40 h-40 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 top-2/3 w-40 h-40 rounded-full bg-green-500/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl z-10">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Arquitetos da Pizza" width={300} height={120} className="object-contain" />
        </div>

        <div className="flex justify-end mb-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => window.print()}
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Link href="/">
            <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-white to-amber-50 shadow-lg rounded-xl overflow-hidden border border-amber-100">
          <div className="p-8 relative overflow-hidden">
            {/* Elementos decorativos dentro do card */}
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-red-500/5 blur-xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-green-500/5 blur-xl pointer-events-none" />

            <div className="relative">
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-6 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-amber-600">
                  Política de Privacidade
                </span>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-full"></div>
              </h1>

              <div className="space-y-6 text-gray-700">
                <p>
                  O <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span>, pessoa jurídica de direito
                  privado inscrito no CNPJ 08.114.350/0001-90, está comprometido com a proteção de dados e informações
                  pessoais que são compartilhados pelos usuários conforme definido abaixo. Essa política define como os
                  dados são protegidos nos processos de coleta, registro, armazenamento, uso, compartilhamento,
                  enriquecimento e eliminação, para além da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados).
                </p>

                <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <h2 className="text-xl font-bold text-amber-800 mb-2">PRINCÍPIOS GERAIS:</h2>
                  <p>
                    O <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span>, tem por política
                    respeitar a privacidade e segurança dos dados pessoais a que tem acesso. Em seus processos
                    estabelecidos, o <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> procura
                    certificar-se de que o tratamento dos dados pessoais se dará de forma transparente, não sendo
                    realizado para finalidades distintas ou incompatíveis àquelas que fundamentaram sua coleta.
                  </p>
                  <p className="mt-2">
                    Políticas de Privacidade específicas podem ser aplicáveis para alguns dos nossos produtos e
                    serviços. Para mais informações sobre nossas práticas de privacidade relacionadas a um produto ou
                    serviço específico, visite a página web deste produto ou serviço.
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h2 className="text-xl font-bold text-red-800 mb-2">
                    QUAL O PAPEL DO ARQUITETOS DA PIZZA NO TRATAMENTO DOS DADOS?
                  </h2>
                  <p>
                    Nosso papel no tratamento dos dados é predominantemente controlador e a Natureza dos Dados tratados
                    pessoal e sensível.
                  </p>
                  <p className="mt-2">
                    Em caso de dúvidas adicionais ou requisições, por favor, entre em contato com nosso Encarregado pela
                    Proteção de Dados por meio do endereço de e-mail:{" "}
                    <a
                      href="mailto:atendimento3@arquitetosdapizza.com.br"
                      className="text-red-600 hover:underline font-medium"
                    >
                      atendimento3@arquitetosdapizza.com.br
                    </a>
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h2 className="text-xl font-bold text-green-800 mb-2">COLETA DE DADOS PESSOAIS</h2>
                  <p>
                    A coleta de dados pessoais é necessária para que O{" "}
                    <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> ofereça serviços e
                    funcionalidades adequados às necessidades dos usuários, bem como para personalizar serviços, fazendo
                    com que sua experiência seja a mais cômoda e satisfatória possível.
                  </p>
                  <p className="mt-2">
                    Ao solicitar dados pessoais e dados pessoais sensíveis, O{" "}
                    <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> poderá solicitar o
                    consentimento do usuário por meio do Termo de Consentimento, seguindo e cumprindo as obrigações
                    legais e regulatórias.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                      <span className="text-amber-800">1</span>
                    </div>
                    DADOS QUE COLETAMOS:
                  </h2>
                  <p>Para prestarmos os nossos serviços, coletamos as seguintes informações:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li className="pl-2">
                      Nós coletamos informações pessoais que são razoavelmente necessárias para prestarmos os serviços
                      de eventos de pizza em casa, bem como para fins administrativos relacionados aos serviços
                      prestados. Essas informações incluem dados cadastrais, como nome, e-mail, endereço, data do
                      evento, informações para contato e telefone;
                    </li>
                    <li className="pl-2">
                      Via de regra, nós coletaremos essas informações diretamente dos clientes. No entanto, podemos
                      também receber essas informações de terceiros, como por exemplo de um familiar ou de outro
                      prestador de serviços (Filial).
                    </li>
                    <li className="pl-2">
                      Informações de terceiros: Nós coletaremos somente as informações razoavelmente necessárias para as
                      atividades primárias da plataforma, incluindo a prestação dos serviços e para fins administrativos
                      relacionados aos serviços prestados.
                    </li>
                    <li className="pl-2">
                      Informações de Navegação, Registros de Acesso e demais informações automatizadas: Armazenamos
                      algumas informações que recebemos automaticamente toda vez que você interage com nosso site
                      (arquitetosdapizza.com.br).
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                      <span className="text-amber-800">2</span>
                    </div>
                    UTILIZAÇÃO DE DADOS PESSOAIS
                  </h2>
                  <p>
                    O <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> poderá tratar os dados
                    pessoais coletados para as finalidades previstas no consentimento informado, tais como; marketing,
                    promoção de eventos e pesquisas de satisfação para melhoria de nossos serviços, entre outros.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                      <span className="text-amber-800">3</span>
                    </div>
                    COMPARTILHAMENTO DE DADOS PESSOAIS
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="pl-2">
                      Haverá transmissão e comunicação de dados pessoais entre os departamentos do{" "}
                      <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> com acesso de
                      colaboradores designados, sempre que necessário, para possibilitar a melhor experiência e
                      atendimento à necessidade do usuário.
                    </li>
                    <li className="pl-2">
                      Com empresas parceiras e fornecedores, no desenvolvimento e prestação de serviços disponibilizados
                      a você.
                    </li>
                    <li className="pl-2">
                      Com autoridades, entidades governamentais ou outros terceiros, para a proteção dos interesses da
                      empresa em qualquer tipo de conflito, incluindo ações judiciais e processos administrativos;
                    </li>
                    <li className="pl-2">
                      Mediante ordem judicial ou pelo requerimento de autoridades administrativas que detenham
                      competência legal para a sua requisição.
                    </li>
                  </ul>
                </div>

                {/* Continuar com as demais seções... */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                      <span className="text-amber-800">4</span>
                    </div>
                    CONSERVAÇÃO DE DADOS PESSOAIS
                  </h2>
                  <p>
                    Os dados são conservados pelo período estritamente necessário para cada uma das finalidades
                    descritas acima e/ou de acordo com prazos legais vigentes. Em caso de litígio pendente, os dados
                    podem ser conservados até trânsito em julgado da decisão.
                  </p>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <h2 className="text-xl font-bold text-amber-800 mb-2">SEGURANÇA DA INFORMAÇÃO</h2>
                  <p>
                    O Arquitetos da Pizza se responsabiliza pelos dados fornecidos por seus clientes, mantendo controles
                    de segurança para preservar a confidencialidade, integridade e disponibilidade dos dados por nós
                    controlados.
                  </p>
                  <p className="mt-2">
                    Todas as ações e controles visam manter a proteção dos dados e evitar acessos indevidos. O{" "}
                    <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> segue as melhores práticas
                    de mercado quanto a segurança das informações e segue as legislações em vigência e as pertinentes ao
                    segmento. Em caso de vazamento de dados, os titulares de dados serão informados, contudo uma vez
                    públicos, não será possível garantir que estes não possam ser acessados indevidamente.
                  </p>
                </div>

                {/* Adicione as demais seções seguindo o mesmo padrão de estilização */}
                {/* ... */}

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">O QUE SÃO COOKIES E COMO SÃO TRATADOS</h2>
                  <p>
                    Cookies são pequenos arquivos que podem ser armazenados em seus dispositivos sempre que um usuário
                    acessa o site e serviços online do{" "}
                    <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> melhorar a experiência dos
                    usuários durante a visita ao site. A coleta de cookies pelo{" "}
                    <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> pode ser aceita ou revogada
                    sempre que o usuário visita a página.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">COMPARTILHAMENTO DE DADOS PESSOAIS</h2>
                  <p>
                    Todo compartilhamento de dados pessoais realizados são para compor a melhor experiência e prestação
                    dos serviços aos nossos clientes. Com isso, pode haver compartilhamentos entre departamentos
                    internos sempre seguindo as exigências regulamentadoras e legislações vigentes.
                  </p>
                  <p className="mt-2">
                    O compartilhamento de dados interno ou externo deverá seguir protocolos seguros de troca de
                    informações.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">DIREITOS DOS USUÁRIOS</h2>
                  <p>
                    Nos termos da legislação aplicável, o titular do dado poderá a qualquer tempo solicitar o acesso aos
                    dados que lhe digam respeito, bem como a sua retificação, eliminação ou a limitação de uso do dado
                    pessoal, a portabilidade dos seus dados, ou ainda opor-se ao seu tratamento, exceto nos casos
                    previstos em lei. Poderá exercer estes direitos mediante pedido escrito dirigido ao e-mail:{" "}
                    <a
                      href="mailto:atendimento3@arquitetosdapizza.com.br"
                      className="text-red-600 hover:underline font-medium"
                    >
                      atendimento3@arquitetosdapizza.com.br
                    </a>
                  </p>
                  <p className="mt-2">Segundo a LGPD, os direitos dos titulares de dados são:</p>
                  <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                    <li>Confirmação da existência de tratamento;</li>
                    <li>Acesso aos dados;</li>
                    <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                    <li>
                      Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em
                      desconformidade com a legislação vigente;
                    </li>
                    <li>
                      Portabilidade dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa, de
                      acordo com a regulamentação da autoridade nacional, observados os segredos comercial e industrial;
                    </li>
                    <li>
                      Eliminação dos dados pessoais tratados com o consentimento do titular, exceto nas hipóteses
                      previstas em Lei;
                    </li>
                    <li>
                      Informação das entidades públicas e privadas com as quais o controlador realizou uso compartilhado
                      de dados;
                    </li>
                    <li>
                      Informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da
                      negativa;
                    </li>
                    <li>Revogação do consentimento;</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    ALTERAÇÕES A POLÍTICA DE PRIVACIDADE E COOKIES
                  </h2>
                  <p>
                    Poderemos alterar esta Política de Privacidade de dados e Uso de Cookies a qualquer momento. Estas
                    alterações serão devidamente disponibilizadas e, caso represente uma alteração substancial
                    relativamente à forma como os seus dados serão tratados.
                  </p>
                  <p className="mt-2">
                    Em situações relevantes, principalmente na eventual modificação das finalidades para os quais os
                    dados tenham sido coletados, o Titular será informado quanto às alterações realizadas. A nova
                    Política de Privacidade entrará em vigor imediatamente após a publicação.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">DIVULGAÇÃO LEGAL DOS DADOS</h2>
                  <p>
                    Em certas circunstâncias, a poderá divulgar Dados Pessoais, na medida necessária ou apropriada, para
                    órgãos governamentais, com o objetivo de cumprir com a legislação aplicável ou com uma ordem ou
                    intimação judicial ou, ainda, se o{" "}
                    <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> acreditar de boa-fé que tal
                    ação seja necessária para:
                  </p>
                  <ul className="list-[lower-roman] pl-6 mt-2 space-y-1">
                    <li>Cumprir com uma legislação que exija tal divulgação;</li>
                    <li>
                      Investigar, impedir ou tomar medidas relacionadas a atividades ilegais suspeitas ou reais ou para
                      cooperar com órgãos públicos ou para proteger a segurança nacional;
                    </li>
                    <li>Execução de seus contratos;</li>
                    <li>Investigar e se defender contra quaisquer reivindicações ou alegações de terceiros;</li>
                    <li>
                      Proteger a segurança ou a integridade dos serviços (por exemplo, o compartilhamento com empresas
                      que estão sofrendo ameaças semelhantes);
                    </li>
                    <li>
                      Exercer ou proteger os direitos, a propriedade e a segurança do{" "}
                      <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> e seus parceiros;
                    </li>
                    <li>Proteger os direitos e a segurança pessoal de seus funcionários, usuários ou do público;</li>
                    <li>
                      Em caso de venda, compra, fusão, reorganização, liquidação ou dissolução do{" "}
                      <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span>.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">SOLICITAÇÕES E RECLAMAÇÕES</h2>
                  <p>
                    Para qualquer uma das solicitações referentes aos direitos dos titulares, o mesmo pode entrar em
                    contato com o <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> através do
                    endereço{" "}
                    <a
                      href="mailto:atendimento3@arquitetosdapizza.com.br"
                      className="text-red-600 hover:underline font-medium"
                    >
                      atendimento3@arquitetosdapizza.com.br
                    </a>
                  </p>
                  <p className="mt-2">
                    Além disso, os titulares de dados podem apresentar reclamações diretamente à Agência Nacional de
                    Proteção de Dados conforme previsto na LGPD.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">LEGISLAÇÃO E FORO</h2>
                  <p>
                    Este Aviso será regido, interpretado e executado de acordo com a legislação pátria, especialmente a
                    Lei 13.709/2018 (LGPD), sendo competente o foro de domicílio do Titular dos dados pessoais para
                    dirimir qualquer dúvida decorrente deste documento.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">DEFINIÇÕES</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-semibold">LGPD:</span> Lei nº 13.709/2018 (Lei Geral de Proteção de Dados).
                    </li>
                    <li>
                      <span className="font-semibold">DADOS PESSOAIS:</span> Qualquer informação relacionada a pessoa
                      natural, direta ou indiretamente, identificada ou identificável
                    </li>
                    <li>
                      <span className="font-semibold">DADOS PESSOAIS SENSÍVEIS:</span> Um dado pessoal sensível é aquele
                      que se refere à origem racial ou étnica, convicção religiosa, opinião política, filiação a
                      sindicato ou a organização de caráter religioso, filosófico ou político, quando vinculado a uma
                      pessoa natural.
                    </li>
                    <li>
                      <span className="font-semibold">TITULAR DO DADO PESSOAL:</span> Pessoa da qual o dado pessoal
                      pertence.
                    </li>
                    <li>
                      <span className="font-semibold">USUÁRIO:</span> Qualquer pessoa natural que possa fornecer dados
                      pessoais para o <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> por
                      qualquer um dos canais disponíveis, atendimento presencial, site, aplicativos e portais.
                    </li>
                    <li>
                      <span className="font-semibold">COOKIES:</span> Arquivos enviados pelo servidor do Site para o
                      computador dos Usuários, com a finalidade de identificá-lo e obter os dados de acesso, como
                      páginas navegadas ou links clicados, permitindo, desta forma, personalizar a navegação dos
                      Usuários no Site, de acordo com o seu perfil
                    </li>
                    <li>
                      <span className="font-semibold">TERMO DE CONSENTIMENTO:</span> documento que coleta manifestação
                      favorável ao tratamento dos dados pessoais para finalidades determinadas.
                    </li>
                    <li>
                      <span className="font-semibold">SITE:</span> Designa o endereço eletrônico
                      arquitetosdapizza.com.br e seus subdomínios.
                    </li>
                    <li>
                      <span className="font-semibold">DADO ANONIMIZADO:</span> Quaisquer dados pessoais que, uma vez
                      tratados com a utilização de meios técnicos razoáveis e disponíveis na ocasião de seu tratamento,
                      inviabilizem a identificação do seu titular.
                    </li>
                    <li>
                      <span className="font-semibold">BASE LEGAL:</span> São critérios estabelecidos pela LGPD, para
                      descrever em quais situações o tratamento de dados é permitido sem necessidade de consentimento do
                      usuário.
                    </li>
                    <li>
                      <span className="font-semibold">FINALIDADE:</span> o objetivo, o propósito que o{" "}
                      <span className="font-semibold text-red-600">ARQUITETOS DA PIZZA</span> deseja alcançar a partir
                      de cada ato de tratamento das informações pessoa
                    </li>
                  </ul>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                  <p>Última atualização: Maio de 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
