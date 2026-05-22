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
  XCircle,
  Calendar
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
    tipo: 'Crítico',
    descricao: 'Valor de rubrica "Equipamentos" excedido em 15%',
    projeto: 'Modernização de Sistemas',
    data: '21/05/2026',
    status: 'pendente'
  },
  {
    id: '2',
    tipo: 'Médio',
    descricao: 'Documento NF-902 apresenta data de emissão divergente',
    projeto: 'Modernização de Sistemas',
    data: '20/05/2026',
    status: 'em_analise'
  },
  {
    id: '3',
    tipo: 'Informativo',
    descricao: 'Prazo para prestação de contas da Parcela 4 vence em 10 dias',
    projeto: 'Modernização de Sistemas',
    data: '19/05/2026',
    status: 'novo'
  }
]

export default function DivergenciasPage() {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Crítico': return 'bg-red-100 text-red-700 border-red-200'
      case 'Médio': return 'bg-amber-100 text-amber-700 border-amber-200'
      default: return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-blue-50 overflow-x-hidden">
      <Sidebar />
      
      {/* Header Fixo - Título alterado para Divergências */}
      <div className="fixed top-0 left-0 right-0 z-30 w-full bg-blue-900 shadow-lg">
        <div className={cn(
          "transition-all duration-300 ease-linear",
          isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
        )}>
          <Header title="Divergências" />
        </div>
      </div>
      
      <div className={cn(
        "flex-1 w-full pt-20 transition-all duration-300 ease-linear",
        isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
        )}>
        <main className="p-6 space-y-6 w-full">
          
          {/* Barra de Filtros */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
              <Input placeholder="Buscar por divergência ou projeto..." className="pl-9 bg-white border-blue-200" />
            </div>
            <Button variant="outline" className="border-blue-200 text-blue-700 bg-white">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Stats em Azul Suave */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
            <StatsCard title="Divergências Ativas" value="12" icon={AlertTriangle} />
            <StatsCard title="Críticas" value="3" icon={ShieldAlert} />
            <StatsCard title="Em Análise" value="5" icon={Clock} />
            <StatsCard title="Resolvidas" value="24" icon={CheckCircle2} />
          </div>

          {/* Lista de Divergências com fundo azul suave */}
          <Card className="bg-[#ebf2ff] border-blue-100 shadow-sm w-full overflow-hidden">
            <CardHeader className="border-b border-blue-200/50">
              <CardTitle className="text-base font-bold text-blue-900">Gestão de Divergências Identificadas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#d6e4ff] text-blue-900">
                    <tr>
                      <th className="px-6 py-3 font-semibold uppercase tracking-wider text-[11px]">Tipo</th>
                      <th className="px-6 py-3 font-semibold uppercase tracking-wider text-[11px]">Descrição</th>
                      <th className="px-6 py-3 font-semibold uppercase tracking-wider text-[11px]">Data</th>
                      <th className="px-6 py-3 font-semibold uppercase tracking-wider text-[11px] text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-200/50">
                    {mockAlertas.map((alerta) => (
                      <tr key={alerta.id} className="hover:bg-blue-200/30 transition-colors">
                        <td className="px-6 py-4">
                          <Badge className={cn("px-2 py-0.5 font-bold", getTipoColor(alerta.tipo))}>
                            {alerta.tipo}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-blue-900">{alerta.descricao}</span>
                            <span className="text-[10px] text-blue-500 uppercase font-bold">{alerta.projeto}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-blue-600 font-mono text-xs">{alerta.data}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" className="text-blue-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}