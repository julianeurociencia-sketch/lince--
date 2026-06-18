'use client'

import { useState } from 'react'
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Clock, 
  ShieldAlert,
  FileText,
  CheckCircle2,
  ChevronRight,
  XCircle,
  Calendar,
  ArrowRight,
  AlertCircle
} from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { StatsCard } from '@/components/stats-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const mockAlertas = [
  {
    id: '1',
    titulo: 'Comprovante bancário não localizado',
    referencia: 'NF 002-847',
    descricao: 'O pagamento da correspondente não foi localizado no fluxo financeiro dos últimos trimestres.',
    referenceManual: 'MANUAL 5.4.17 - PÁGINAS 115-116',
    manualTopic: 'Equipamentos a Material Permanente',
    detailedDescription: 'Logo em um manual não foi encontrado e a correspondente não foi localizado.',
    prioridade: 'Crítica',
    icon: 'arquivo',
    status: 'pendente'
  },
  {
    id: '2',
    titulo: 'Despesa fora do período de execução',
    referencia: 'NF 003-302',
    descricao: 'A data de emissão está fora da vigência registrada para o projeto.',
    referenceManual: 'MANUAL: ORIENTAÇÃO GERAL - PÁGINAS 68',
    manualTopic: 'Validade do documento fiscal',
    detailedDescription: 'Uma ou documento com data antes ou posterior ao período da aplicação dos recursos.',
    prioridade: 'Crítica',
    icon: 'documento',
    status: 'pendente'
  },
  {
    id: '3',
    titulo: 'Valor acima do previsto na rubrica',
    referencia: 'NF 002-153',
    descricao: 'O valor acumulado ultrapassa o limite planejado para a categoria.',
    referenceManual: 'MANUAL 5.3.2.2 - PÁGINA 102',
    manualTopic: 'Diárias e Ajuda de Custo',
    detailedDescription: 'O valor do documento ultrapassa os limites fixados por modalidade e também guia de gastos.',
    prioridade: 'Revisar',
    icon: 'moeda',
    status: 'em_analise'
  },
  {
    id: '4',
    titulo: 'Relatório detalhado de obra pendente',
    referencia: 'NF 006-098',
    descricao: 'Não foi encontrado o relatório dos serviços executado para fase da obra.',
    referenceManual: 'MANUAL 5.4.1.7 - PÁGINA 156',
    manualTopic: 'Documentação de Serviços',
    detailedDescription: 'Etiqueta do equipamento e documentação de padrão referente não apresenta ou foi descumprida.',
    prioridade: 'Revisar',
    icon: 'documento',
    status: 'em_analise'
  }
]

export default function DivergenciasPage() {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'

  const filtros = [
    { id: 'todos', label: 'Todos', count: 4 },
    { id: 'criticas', label: 'Críticas', count: 2 },
    { id: 'revisar', label: 'Revisar', count: 2 },
    { id: 'sem-virus', label: 'Sem-vírus', count: 0 }
  ]

  const getIconByType = (iconType: string) => {
    switch (iconType) {
      case 'arquivo':
        return <FileText className="h-8 w-8" />
      case 'documento':
        return <AlertCircle className="h-8 w-8" />
      case 'moeda':
        return <ShieldAlert className="h-8 w-8" />
      default:
        return <AlertTriangle className="h-8 w-8" />
    }
  }

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Crítica':
        return 'bg-rose-50 text-rose-700 border-rose-200'
      case 'Revisar':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200'
    }
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
            <span className="text-slate-900">Divergências</span>
          </nav>
          
          {/* Barra de Busca */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Buscar por divergência ou projeto..." className="pl-9 bg-white border-slate-200 focus-visible:ring-slate-300 rounded-xl" />
            </div>
            <Button variant="outline" className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm rounded-xl">
              <Filter className="h-4 w-4 mr-2 text-slate-500" />
              Filtros
            </Button>
          </div>

          {/* Stats em 3 colunas */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full">
            <StatsCard title="Divergências Críticas" value="2" icon={AlertTriangle} variant="destructive" />
            <StatsCard title="Requerem revisão" value="3" icon={Clock} variant="warning" />
            <StatsCard title="Com responsabilidade" value="1" icon={AlertTriangle} variant="default" />
          </div>

          {/* Mensagem de aviso */}
          <div className="bg-amber-50/50 border border-amber-200/50 rounded-[20px] p-6 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Atenção</p>
              <p className="text-sm text-amber-700 mt-1">As divergências não resolvidas podem bloquear o envio do projeto. Revise e resolva-as com prioridade.</p>
            </div>
          </div>

          {/* Lista de Divergências */}
          <div className="space-y-4">
            {mockAlertas.map((alerta) => (
              <div 
                key={alerta.id} 
                className={cn(
                  "rounded-[24px] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-md transition-all border-l-4",
                  alerta.prioridade === 'Crítica' ? 'border-l-rose-500' : 'border-l-amber-500'
                )}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Ícone */}
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ring-1",
                    alerta.prioridade === 'Crítica' ? 'text-rose-600 bg-rose-50 ring-rose-100' : 'text-amber-600 bg-amber-50 ring-amber-100'
                  )}>
                    {getIconByType(alerta.icon)}
                  </div>

                  {/* Conteúdo Principal */}
                  <div className="flex-1 min-w-0">
                    {/* Referência */}
                    <div className="text-xs text-slate-400 font-mono font-semibold mb-1">
                      {alerta.referencia}
                    </div>

                    {/* Título */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {alerta.titulo}
                    </h3>

                    {/* Descrição */}
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                      {alerta.descricao}
                    </p>

                    {/* Manual Reference Box */}
                    <div className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4">
                      <div className="text-xs text-slate-400 font-mono font-semibold mb-1">
                        {alerta.referenceManual}
                      </div>
                      <div className="text-sm font-semibold text-slate-700">
                        {alerta.manualTopic}
                      </div>
                      <div className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {alerta.detailedDescription}
                      </div>
                    </div>
                  </div>

                  {/* Lado direito: Badge e Botão */}
                  <div className="flex lg:flex-col items-start lg:items-end justify-between lg:justify-start gap-4">
                    <Badge className={cn("rounded-full border px-3 py-1 text-xs font-semibold shadow-none", getPriorityColor(alerta.prioridade))}>
                      {alerta.prioridade}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-[#708D7A] hover:text-[#708D7A]/80 hover:bg-[#708D7A]/10 rounded-xl px-3 py-2 text-xs font-semibold gap-1 cursor-pointer"
                    >
                      Revisar documentos
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}