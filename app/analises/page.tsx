'use client'

import { useState } from 'react'
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText,
  ChevronRight,
} from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { StatsCard } from '@/components/stats-card'
import { Badge } from '@/components/ui/badge'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const planoTrabalhoData = [
  { rubrica: '2. Material de Consumo', aprovado: 350000, utilizado: 280000, progresso: 80, status: 'Regular' },
  { rubrica: '3. Equipamentos', aprovado: 800000, utilizado: 720000, progresso: 90, status: 'Atenção' },
  { rubrica: '4. Serviços Técnicos', aprovado: 450000, utilizado: 320000, progresso: 71, status: 'Regular' },
  { rubrica: '5. Viagens e Diárias', aprovado: 200000, utilizado: 145000, progresso: 73, status: 'Regular' },
]

export default function AnalisesPage() {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F5F3EF] overflow-x-hidden">
      <Sidebar />
      
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
            <span className="text-slate-900">Análises</span>
          </nav>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
            <StatsCard title="Documentos do Projeto" value="6" icon={FileText} />
            <StatsCard title="Já Analisados" value="4" icon={CheckCircle2} trend={{ value: 85, isPositive: true }} variant="success" />
            <StatsCard title="Pendentes de Análise" value="0" icon={Clock} variant="warning" />
            <StatsCard title="Divergências Encontradas" value="3" icon={AlertTriangle} variant="destructive" />
          </div>

          <div className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-0 w-full overflow-hidden">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Estrutura do Plano de Trabalho</h3>
              <p className="mt-2 text-sm text-slate-500">Categorias e rubricas que serão analisadas</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Rubrica</th>
                    <th className="px-4 py-4 font-semibold">Valor Aprovado</th>
                    <th className="px-4 py-4 font-semibold">Valor Utilizado</th>
                    <th className="px-4 py-4 font-semibold">Execução</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {planoTrabalhoData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4 font-medium text-slate-900">{item.rubrica}</td>
                      <td className="px-4 py-4 text-slate-700 font-mono">{formatCurrency(item.aprovado)}</td>
                      <td className="px-4 py-4 text-slate-700 font-mono">{formatCurrency(item.utilizado)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-emerald-600" style={{ width: `${item.progresso}%` }} />
                          </div>
                          <span className="text-xs font-bold text-slate-700">{item.progresso}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className={cn(
                          "font-bold px-3 py-1 text-[10px] uppercase rounded-full border shadow-none",
                          item.status === 'Regular' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                        )}>
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}