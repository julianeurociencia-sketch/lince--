'use client'

import { useState } from 'react'
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
} from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { StatsCard } from '@/components/stats-card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <div className="min-h-screen w-full flex flex-col bg-blue-50 overflow-x-hidden">
      <Sidebar />
      
      <div className="fixed top-0 left-0 right-0 z-30 w-full bg-blue-900 shadow-lg">
        <div className={cn(
          "transition-all duration-300 ease-linear",
          isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
        )}>
          <Header title="Análises" />
        </div>
      </div>
      
      <div className={cn(
        "flex-1 w-full pt-20 transition-all duration-300 ease-linear",
        isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
      )}>
        <main className="p-6 space-y-6 w-full">
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
            <StatsCard title="Documentos do Projeto" value="6" icon={FileText} />
            <StatsCard title="Já Analisados" value="4" icon={CheckCircle2} trend={{ value: 85, isPositive: true }} />
            <StatsCard title="Pendentes de Análise" value="0" icon={Clock} />
            <StatsCard title="Divergências Encontradas" value="3" icon={AlertTriangle} />
          </div>

          <Card className="bg-[#ebf2ff] border-blue-100 shadow-sm w-full overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold text-blue-900">Estrutura do Plano de Trabalho</CardTitle>
              <p className="text-sm text-blue-600">Categorias e rubricas que serão analisadas</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-blue-500 border-b border-blue-200">
                    <tr>
                      <th className="px-4 py-4 font-semibold">Rubrica</th>
                      <th className="px-4 py-4 font-semibold">Valor Aprovado</th>
                      <th className="px-4 py-4 font-semibold">Valor Utilizado</th>
                      <th className="px-4 py-4 font-semibold">Execução</th>
                      <th className="px-4 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100">
                    {planoTrabalhoData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-blue-100/30 transition-colors">
                        <td className="px-4 py-4 font-medium text-blue-900">{item.rubrica}</td>
                        <td className="px-4 py-4 text-blue-800 font-mono">{formatCurrency(item.aprovado)}</td>
                        <td className="px-4 py-4 text-blue-800 font-mono">{formatCurrency(item.utilizado)}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <Progress value={item.progresso} className="h-2 w-24 bg-blue-200" />
                            <span className="text-xs font-bold text-blue-700">{item.progresso}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge className={cn(
                            "font-bold px-2 py-0.5 text-[10px] uppercase",
                            item.status === 'Regular' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                          )}>
                            {item.status}
                          </Badge>
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