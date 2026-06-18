'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Book, 
  Search, 
  ChevronRight, 
  ChevronDown,
  FileText,
  AlertTriangle,
  CheckCircle,
  Info,
  Bookmark,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Filter,
  BookOpen,
  Plane,
  Coffee,
  Package,
  Building2,
  Monitor,
  DollarSign
} from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { StatsCard } from '@/components/stats-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
// Dados do Manual de Gestão Petrobras - Rubricas de Prestação de Contas
const manualSections = [
  {
    id: 'passagens',
    titulo: 'Passagens e Locomoção',
    icon: Plane,
    cor: 'blue',
    resumo: 'Despesas com transporte aéreo e terrestre para atividades do projeto',
    artigos: [
      {
        id: 'pass1',
        numero: '5.4.3.1',
        titulo: 'Documentação Obrigatória',
        conteudo: 'Para comprovação das passagens e despesas de locomoção deverão ser enviados obrigatoriamente: Nota fiscal da agência de viagem ou confirmação de compra da empresa aérea/terrestre com o tipo de tarifa aplicada (com atesto); Comprovante de pagamento da nota fiscal; Para viagens aéreas: comprovante de embarque (e-ticket).',
        destaque: true,
        relevante: true
      },
      {
        id: 'pass2',
        numero: '5.4.3.1.1',
        titulo: 'Critérios de Economicidade',
        conteudo: 'Devem ser adotados os critérios de economicidade e razoabilidade na aquisição das passagens. Passagens nacionais para viagens de 1 dia serão realizadas obrigatoriamente na tarifa sem despacho de bagagem. Em caso de necessidade de despacho de bagagem para viagem de 1 dia, é obrigatório apresentar justificativa.',
        destaque: true,
        relevante: true
      },
      {
        id: 'pass3',
        numero: '5.4.3.1.2',
        titulo: 'Seguro e Bagagem',
        conteudo: 'O valor previsto da passagem no plano de trabalho deve incluir o seguro de viagem e o reembolso de despacho de bagagem (se houver). Em caso de reembolso de tarifa de despacho de bagagem para viagens acima de 1 dia, devem ser apresentados: Recibo de pagamento das bagagens em nome do membro da equipe e comprovante de pagamento.',
        destaque: false,
        relevante: true
      },
      {
        id: 'pass4',
        numero: '5.4.3.1.3',
        titulo: 'Casos Excepcionais',
        conteudo: 'Em casos excepcionais, despesas com passagens pagas por cartão de crédito de membros da equipe podem ser aceitas, desde que cada membro adquira sua própria passagem. A prestação de contas deve incluir uma carta assinada pelo ordenador de despesas da convenente, contendo os motivos pelos quais a compra não pode ser realizada através da conta exclusiva do projeto.',
        destaque: false,
        relevante: false
      }
    ]
  },
  {
    id: 'diarias',
    titulo: 'Diárias e Ajuda de Custo',
    icon: Coffee,
    cor: 'amber',
    resumo: 'Valores para hospedagem, alimentação e deslocamento durante viagens',
    artigos: [
      {
        id: 'dia1',
        numero: '5.4.3.2',
        titulo: 'Regra Geral',
        conteudo: 'Somente integrantes da equipe executora do projeto poderão receber diárias ou ajuda de custo de viagens. É possível pagar diárias, passagens e taxas de inscrição em congressos a profissionais não remunerados pelo termo de cooperação, desde que eles integrem a equipe executora do projeto.',
        destaque: true,
        relevante: true
      },
      {
        id: 'dia2',
        numero: '5.4.3.2.1',
        titulo: 'Documentação Comprobatória',
        conteudo: 'Despesas de diárias ou ajuda de custo devem estar atreladas a uma viagem e serão comprovadas com: Relatório de viagem; Documentação comprobatória de locomoção; Comprovante de depósito bancário da diária em conta do favorecido.',
        destaque: true,
        relevante: true
      },
      {
        id: 'dia3',
        numero: '5.4.3.2.2',
        titulo: 'Valores Máximos Nacionais',
        conteudo: 'O valor das diárias a serem pagas deve cobrir os custos de deslocamento, alimentação e hospedagem. Para viagens nacionais, o valor máximo é de R$ 500,00 por diária. Quando da vinda de um Pesquisador Visitante estrangeiro ao Brasil, a viagem será internacional, porém com diária nacional.',
        destaque: true,
        relevante: true
      },
      {
        id: 'dia4',
        numero: '5.4.3.2.3',
        titulo: 'Ajuda de Custo',
        conteudo: 'Em caso de viagem com duração superior a 15 dias e inferior a 1 ano, é admitida concessão de ajuda de custo, devendo ser definida no momento da elaboração da proposta, ou reformulada conforme necessidade do projeto, seguindo as regras da Resolução ANP 918/2023.',
        destaque: false,
        relevante: true
      },
      {
        id: 'dia5',
        numero: '5.4.3.2.4',
        titulo: 'Taxa de Câmbio',
        conteudo: 'Para a rubrica "Diárias e Ajuda de Custo", o valor máximo da taxa de câmbio é parametrizado no SIGITEC baseado na taxa de câmbio adotada pela Petrobras. Deve-se atentar para os limites de valores de diárias e ajuda de custo por país no momento da realização das viagens.',
        destaque: false,
        relevante: false
      }
    ]
  },
  {
    id: 'material_consumo',
    titulo: 'Material de Consumo',
    icon: Package,
    cor: 'emerald',
    resumo: 'Itens consumíveis utilizados durante a execução do projeto',
    artigos: [
      {
        id: 'mat1',
        numero: '5.4.3.3',
        titulo: 'Definição',
        conteudo: 'São considerados materiais de consumo os itens de despesa que são consumidos, perdem identidade física ou tem sua utilização limitada ao longo do prazo de execução do projeto. Exemplos: Vidrarias, reagentes, materiais de consumo de uso laboratorial, combustíveis, gases, materiais elétricos, eletrônicos, ferramentas, sobressalentes.',
        destaque: true,
        relevante: true
      },
      {
        id: 'mat2',
        numero: '5.4.3.3.1',
        titulo: 'Documentação Obrigatória',
        conteudo: 'Todo material de consumo deverá ser comprovado com: Nota fiscal com atesto; Comprovante de pagamento da nota fiscal (para despesas realizadas a partir de 01/09/2017).',
        destaque: true,
        relevante: true
      },
      {
        id: 'mat3',
        numero: '5.4.3.3.2',
        titulo: 'Agrupamento por Similaridade',
        conteudo: 'Para uma melhor execução do projeto recomenda-se que as despesas com materiais de consumo sejam agrupadas por similaridade (da mesma natureza) dentro de um mesmo item, por exemplo: materiais de escritório, materiais de informática, vidraria, reagentes, EPI. Materiais de naturezas distintas devem ser apresentados em itens diferentes.',
        destaque: false,
        relevante: true
      },
      {
        id: 'mat4',
        numero: '5.4.3.3.3',
        titulo: 'Limite para Memória de Cálculo',
        conteudo: 'Para itens acima de R$ 16 mil (inclusive) deve ser inserida no SIGITEC memória de cálculo, contendo: descrição do item, quantidade, valor unitário e valor total, além das características e/ou especificações mínimas para validação com valores praticados pelo mercado.',
        destaque: true,
        relevante: true
      },
      {
        id: 'mat5',
        numero: '5.4.3.3.4',
        titulo: 'Vedações',
        conteudo: 'Nas descrições do material de consumo não serão admitidos termos vagos ou genéricos como "outros", "materiais em geral", "etc", "para desenvolvimento do projeto". Para material importado deve ser explicitada a não aquisição de similar nacional e a cotação cambial considerada.',
        destaque: true,
        relevante: true
      }
    ]
  },
  {
    id: 'obras',
    titulo: 'Obras e Instalações',
    icon: Building2,
    cor: 'purple',
    resumo: 'Construção, reforma e adaptação de infraestrutura laboratorial',
    artigos: [
      {
        id: 'obra1',
        numero: '4.1.6.1.2',
        titulo: 'Escopo da Rubrica',
        conteudo: 'Nessa rubrica devem ser relacionadas às despesas para realização de obras civis de construção de novas edificações, de acréscimo de área nas edificações existentes e de reforma de instalações físicas, bem como as despesas com serviços técnicos de apoio relacionados à infraestrutura.',
        destaque: true,
        relevante: true
      },
      {
        id: 'obra2',
        numero: '4.1.6.1.2.1',
        titulo: 'Limite de Valor',
        conteudo: 'No caso de projeto ou programa de PD&I é permitida a execução de pequenas obras de reforma e adaptação das instalações laboratoriais desde que as despesas totais relacionadas no projeto associadas a infraestrutura (Obras e Instalações + Equipamento e Material Permanente) não exceda o valor de R$ 500 mil.',
        destaque: true,
        relevante: true
      },
      {
        id: 'obra3',
        numero: '4.1.6.1.2.2',
        titulo: 'Documentação por Faixa de Valor',
        conteudo: 'Para itens de valor inferior a R$ 50 mil: apresentar documento com descrição e dimensionamento de cada serviço a ser executado, com fotos da infraestrutura atual. Para itens acima de R$ 50 mil (inclusive): apresentação de proposta detalhada e fotos da infraestrutura atual.',
        destaque: true,
        relevante: true
      },
      {
        id: 'obra4',
        numero: '4.1.6.1.2.3',
        titulo: 'Memorial Descritivo',
        conteudo: 'Quando o somatório das despesas de obras civis, previstas na rubrica, seja acima de R$ 100 mil é obrigatória a apresentação de Memorial Descritivo do projeto de reforma ou melhoria, contendo as especificações técnicas necessárias à execução das reformas, com indicação dos locais onde ocorrerão todas as intervenções previstas.',
        destaque: true,
        relevante: true
      },
      {
        id: 'obra5',
        numero: '4.1.6.1.2.4',
        titulo: 'Serviços de Infraestrutura',
        conteudo: 'Serviços necessários para a operacionalização dos equipamentos, tais como: instalação, montagem, comissionamento e calibração inicial (no caso de equipamentos novos), e recuperação ou upgrade, calibração, reformas e outros necessários à operacionalização de equipamentos já existentes, deverão ser considerados na rubrica de "Obras e Instalações".',
        destaque: false,
        relevante: true
      }
    ]
  },
  {
    id: 'equipamentos',
    titulo: 'Equipamentos e Material Permanente',
    icon: Monitor,
    cor: 'cyan',
    resumo: 'Aquisição de equipamentos e materiais com durabilidade superior a 2 anos',
    artigos: [
      {
        id: 'equip1',
        numero: '4.1.6.1.1',
        titulo: 'Definição de Material Permanente',
        conteudo: 'Material Permanente é aquele que, em razão de seu uso corrente, não perde a sua identidade física, e/ou tem uma durabilidade superior a dois anos. São considerados Materiais Permanentes os itens de despesa que tenham durabilidade superior ao prazo de execução do projeto.',
        destaque: true,
        relevante: true
      },
      {
        id: 'equip2',
        numero: '4.1.6.1.1.1',
        titulo: 'Classificação - Material Permanente',
        conteudo: 'Podem ser considerados como material permanente: equipamentos de uso doméstico (micro-ondas, geladeira, bebedouros), ferramental (ex: furadeiras), mobiliários em geral, ar-condicionado Split de baixa capacidade, equipamentos de informática de uso geral e comum (impressora, monitores simples, desktops e notebooks de baixo desempenho).',
        destaque: false,
        relevante: true
      },
      {
        id: 'equip3',
        numero: '4.1.6.1.1.2',
        titulo: 'Classificação - Equipamentos',
        conteudo: 'Devem ser considerados como equipamentos: computadores de alta capacidade, monitores de alta resolução, desktops e notebooks de alto desempenho, sistema de refrigeração de grande porte ou ar-condicionado central, e equipamentos voltados para a pesquisa em questão (microscópios, equipamentos de medição como viscosímetro, etc).',
        destaque: false,
        relevante: true
      },
      {
        id: 'equip4',
        numero: '4.1.6.1.1.3',
        titulo: 'Limite de Infraestrutura',
        conteudo: 'No caso de projeto ou programa de PD&I é permitida a compra de Equipamentos e de Materiais Permanentes desde que as despesas totais relacionadas no projeto associadas à infraestrutura (Obras e Instalações + Equipamento e Material Permanente) não exceda o valor de R$ 500 mil e devem estar diretamente relacionados à execução do escopo do projeto.',
        destaque: true,
        relevante: true
      },
      {
        id: 'equip5',
        numero: '4.1.6.1.1.4',
        titulo: 'Comprovação de Valor',
        conteudo: 'Para todos os equipamentos e material permanente, cujo valor total do item seja igual ou maior que R$ 50 mil, é obrigatória a apresentação de propostas/invoices/orçamentos/cotação/pro forma ou email do fornecedor, via sistema SIGITEC. O documento deve ser original digitalizado, legível, com data inferior a 6 meses da data de submissão.',
        destaque: true,
        relevante: true
      },
      {
        id: 'equip6',
        numero: '4.1.6.1.1.5',
        titulo: 'Itens Importados',
        conteudo: 'No caso de aquisição de Equipamento e Material Permanente importado, para cada item, na justificativa deverá constar: as razões para a não aquisição de similar nacional, além da indicação da taxa de câmbio utilizada no campo "justificativa" (Valor da moeda_Data da Consulta_Fonte).',
        destaque: true,
        relevante: true
      }
    ]
  }
]

interface SubArtigo {
  id: string
  numero: string
  titulo: string
  conteudo: string
  destaque: boolean
}

export default function ManualPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedSections, setExpandedSections] = useState<string[]>(['passagens', 'diarias']) // Expandir algumas por padrão para visualização
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useState<string[]>(['dia3', 'equip5'])
  const [selectedRubrica, setSelectedRubrica] = useState('all')

  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'

  const toggleSection = (id: string) => {
    // Se a seção já estiver expandida, colapsa. Caso contrário, expande.
    // Se você quiser que apenas uma seção fique expandida por vez, mude a lógica para:
    // setExpandedSections(prev => prev.includes(id) ? [] : [id])
    // Ou para expandir/colapsar individualmente:
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
    // Se você quiser que a seção clicada seja a única expandida, use:
    // setExpandedSections([id])
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    )
  }

  const filteredSections = manualSections.filter(section => {
    // Filtro por rubrica selecionada
    if (selectedRubrica !== 'all' && section.id !== selectedRubrica) return false
    
    // Filtro por termo de busca
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      section.titulo.toLowerCase().includes(term) ||
      section.resumo.toLowerCase().includes(term) ||
      section.artigos.some(art => 
        art.titulo.toLowerCase().includes(term) ||
        art.conteudo.toLowerCase().includes(term) ||
        art.numero.toLowerCase().includes(term)
      )
    )
  })

  const totalArtigos = manualSections.reduce((acc, s) => acc + s.artigos.length, 0)
  const artigosDestaque = manualSections.reduce((acc, s) => acc + s.artigos.filter(a => a.destaque).length, 0)

  const getIconColor = (cor: string) => {
    const colors: Record<string, string> = {
      blue: 'text-blue-600 bg-blue-50 ring-1 ring-blue-100/50',
      amber: 'text-amber-600 bg-amber-50 ring-1 ring-amber-100/50',
      emerald: 'text-emerald-600 bg-emerald-50 ring-1 ring-emerald-100/50',
      purple: 'text-purple-600 bg-purple-50 ring-1 ring-purple-100/50',
      cyan: 'text-cyan-600 bg-cyan-50 ring-1 ring-cyan-100/50'
    }
    return colors[cor] || 'text-blue-600 bg-blue-50 ring-1 ring-blue-100/50'
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F5F3EF] overflow-x-hidden">
      <Sidebar />
      
      {/* Header Fixo */}
      <div className="fixed top-0 left-0 right-0 z-30 w-full bg-white shadow-sm">
        <div className={cn(
          "transition-all duration-300 ease-linear",
          isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
        )}>
          <Header title="" />
        </div>
      </div>
      
      <div className={cn(
        "flex-1 w-full pt-24 transition-all duration-300 ease-linear",
        isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
      )}>
        
        <main className="space-y-8 p-8 w-full max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            <span>Lince</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-slate-900">Manual de Gestão</span>
          </nav>
          
          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-4">
            <Select value={selectedRubrica} onValueChange={setSelectedRubrica}>
              <SelectTrigger className="w-56 bg-white border-slate-200 text-slate-700 shadow-sm rounded-xl">
                <DollarSign className="h-4 w-4 mr-2 text-slate-500" />
                <SelectValue placeholder="Rubrica" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="all">Todas as Rubricas</SelectItem>
                <SelectItem value="passagens">Passagens e Locomoção</SelectItem>
                <SelectItem value="diarias">Diárias e Ajuda de Custo</SelectItem>
                <SelectItem value="material_consumo">Material de Consumo</SelectItem>
                <SelectItem value="obras">Obras e Instalações</SelectItem>
                <SelectItem value="equipamentos">Equipamentos e Mat. Permanente</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm rounded-xl">
              <Filter className="h-4 w-4 mr-2 text-slate-500" />
              Filtros
            </Button>

            <div className="ml-auto">
              <Button variant="outline" className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm rounded-xl">
                <ExternalLink className="h-4 w-4 mr-2 text-slate-500" />
                Baixar Manual Completo
              </Button>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Rubricas Cobertas"
              value={manualSections.length.toString()}
              icon={Book}
            />
            <StatsCard
              title="Total de Regras"
              value={totalArtigos.toString()}
              icon={FileText}
            />
            <StatsCard
              title="Regras Críticas"
              value={artigosDestaque.toString()}
              icon={AlertTriangle}
              description="Atenção especial"
              variant="warning"
            />
            <StatsCard
              title="Marcados"
              value={bookmarked.length.toString()}
              icon={Bookmark}
              description="Seus favoritos"
              variant="success"
            />
          </div>

          {/* Busca */}
          <div className="rounded-[24px] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Buscar no manual... (ex: diárias, nota fiscal, R$ 50 mil)"
                className="pl-10 h-12 bg-white border-slate-200 focus-visible:ring-slate-300 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {searchTerm && (
              <p className="text-xs text-slate-500 mt-2 font-medium">
                {filteredSections.length} rubrica(s) encontrada(s) com {filteredSections.reduce((acc, s) => acc + s.artigos.length, 0)} regras
              </p>
            )}
          </div>

          {/* Cards de Rubricas - Visão Rápida */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {manualSections.map((section) => {
              const Icon = section.icon
              const isActive = selectedRubrica === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedRubrica(isActive ? 'all' : section.id)}
                  className={`p-4 rounded-2xl border transition-all text-left cursor-pointer shadow-sm ${
                    isActive 
                      ? 'bg-[#708D7A] border-[#708D7A] text-white shadow-[#708D7A]/10 shadow-lg' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    isActive ? 'bg-white/20' : getIconColor(section.cor)
                  }`}>
                    <Icon className={`h-5 w-5 ${isActive ? 'text-white' : ''}`} />
                  </div>
                  <h3 className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {section.titulo}
                  </h3>
                  <p className={`text-xs mt-1 font-medium ${isActive ? 'text-slate-100' : 'text-slate-400'}`}>
                    {section.artigos.length} regras
                  </p>
                </button>
              )
            })}
          </div>

          {/* Conteúdo do Manual */}
          <div className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-0">
            <div className="pb-6 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-slate-500" />
                <h3 className="text-xl font-bold text-slate-900">Regras de Prestação de Contas</h3>
                <Badge className="bg-slate-50 text-slate-600 border border-slate-200 shadow-none ml-2 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  Resolução ANP 918/2023
                </Badge>
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-580px)] min-h-[400px]">
              <div className="space-y-4 pr-3">
                {filteredSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <div key={section.id} className="border border-slate-200 rounded-[20px] overflow-hidden bg-white shadow-sm">
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(section.cor)}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <span className="font-semibold text-slate-900">{section.titulo}</span>
                            <p className="text-xs text-slate-500 mt-0.5">{section.resumo}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs text-slate-600 border-slate-200 rounded-full font-medium shadow-none bg-white">
                            {section.artigos.length} regras
                          </Badge>
                          {expandedSections.includes(section.id) ? (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Section Content */}
                      <AnimatePresence>
                        {expandedSections.includes(section.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 space-y-3 border-t border-slate-100">
                              {section.artigos.map((artigo) => (
                                <div 
                                  key={artigo.id}
                                  className={`rounded-xl border p-4 ${
                                    artigo.destaque 
                                      ? 'border-amber-200 bg-amber-50/30' 
                                      : 'border-slate-100 bg-slate-50/30'
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Badge 
                                          className={
                                            artigo.destaque
                                              ? 'bg-amber-100/70 text-amber-800 border-amber-200/50 shadow-none font-semibold rounded-full px-2.5 py-0.5 text-xs'
                                              : 'bg-slate-100 text-slate-600 border-slate-200/50 shadow-none font-semibold rounded-full px-2.5 py-0.5 text-xs'
                                          }
                                        >
                                          {artigo.numero}
                                        </Badge>
                                        <span className="font-semibold text-slate-900">{artigo.titulo}</span>
                                        {artigo.destaque && (
                                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                                        )}
                                      </div>
                                      <p className="text-slate-600 text-sm leading-relaxed">
                                        {artigo.conteudo}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleBookmark(artigo.id)}
                                        className={bookmarked.includes(artigo.id) ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-400 hover:text-slate-600'}
                                      >
                                        <Bookmark className="h-4 w-4" fill={bookmarked.includes(artigo.id) ? 'currentColor' : 'none'} />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(`${artigo.numero}: ${artigo.conteudo}`, artigo.id)}
                                        className="text-slate-400 hover:text-slate-600"
                                      >
                                        {copiedId === artigo.id ? (
                                          <Check className="h-4 w-4 text-emerald-500" />
                                        ) : (
                                          <Copy className="h-4 w-4 text-slate-400" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Rodapé informativo */}
          <div className="rounded-[24px] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-0">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-[#708D7A] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900">Sobre este Manual</h4>
                <p className="text-sm text-slate-500 mt-1">
                  Este conteúdo é baseado no Manual de Gestão de Projetos de PD&I da Petrobras (Versão 26 - 20/08/2025) 
                  e na Resolução ANP 918/2023. Para consultas completas, acesse o manual oficial através do SIGITEC ou 
                  entre em contato pelo email investimentoexterno@petrobras.com.br
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
