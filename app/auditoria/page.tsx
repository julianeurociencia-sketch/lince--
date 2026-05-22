'use client'

import { useState } from 'react'
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { StatsCard } from '@/components/stats-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { ReportModal } from '@/components/report-modal'

const mockRelatorios = [
  { id: '1', periodo: 'Janeiro - Março 2024', status: 'Enviado', valorTotal: 450000.0, dataLimite: '15/04/2024', conclusao: 100 },
  { id: '2', periodo: 'Abril - Junho 2024', status: 'Em Edição', valorTotal: 320000.5, dataLimite: '15/07/2024', conclusao: 65 },
  { id: '3', periodo: 'Julho - Setembro 2024', status: 'Pendente', valorTotal: 0, dataLimite: '15/10/2024', conclusao: 0 },
]

export default function AuditoriaPage() {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  return (
    <div className="min-h-screen w-full flex bg-blue-50">
      <Sidebar />

      {/* Container Principal ajustável à Sidebar */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-linear",
        isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
      )}>
        
        {/* Header Fixo no topo do conteúdo principal */}
        <div className="sticky top-0 z-30 w-full bg-blue-900 shadow-lg">
          <Header title="Auditoria e Prestação" />
        </div>

        <main className="p-6 space-y-6 w-full max-w-[1600px] mx-auto">
          
          {/* Dashboard Stats */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
            <StatsCard title="Total Comprovado" value="R$ 770k" icon={TrendingUp} />
            <StatsCard title="Docs Validados" value="128" icon={CheckCircle2} />
            <StatsCard title="Pendentes" value="14" icon={Clock} />
            <StatsCard title="Divergências" value="2" icon={AlertTriangle} />
          </div>

          <div className="grid gap-6 lg:grid-cols-3 w-full">
            {/* Tabela de Relatórios */}
            <Card className="lg:col-span-2 bg-[#ebf2ff] border-blue-100 shadow-sm overflow-hidden border-none">
              <CardHeader className="border-b border-blue-200/50 bg-white/50">
                <CardTitle className="text-base font-bold text-blue-900 font-sans">
                  Relatórios de Prestação de Contas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-blue-200/50">
                  {mockRelatorios.map((rel) => (
                    <div key={rel.id} className="p-4 hover:bg-white/60 transition-all flex items-center justify-between group">
                      <div className="space-y-1">
                        <p className="font-bold text-blue-900">{rel.periodo}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-blue-500 font-mono font-bold tracking-tight">
                            LIMITE: {rel.dataLimite}
                          </span>
                          <Badge className={cn(
                            "text-[9px] px-2 py-0 uppercase font-black rounded-full",
                            rel.status === 'Enviado' ? "bg-emerald-100 text-emerald-700 border-emerald-200" : 
                            rel.status === 'Em Edição' ? "bg-blue-100 text-blue-700 border-blue-200" : 
                            "bg-amber-100 text-amber-700 border-amber-200"
                          )}>
                            {rel.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="hidden sm:block text-right">
                          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter">Valor Total</p>
                          <p className="text-sm font-black text-blue-900">
                            {rel.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </p>
                        </div>
                        <div className="w-20">
                          <Progress value={rel.conclusao} className="h-1.5 bg-blue-200" />
                        </div>
                        <Button variant="ghost" size="icon" className="text-blue-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Checklist e Ações */}
            <div className="space-y-6">
              <Card className="bg-white border-blue-100 shadow-sm rounded-[20px]">
                <CardHeader>
                  <CardTitle className="text-xs font-black text-blue-900 uppercase tracking-widest">
                    Checklist de Conformidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-50 p-1 rounded-full text-emerald-500">
                       <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-900 leading-none mb-1">Notas Fiscais</p>
                      <p className="text-[11px] text-slate-500">XMLs validados e atestados.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-50 p-1 rounded-full text-amber-500">
                       <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-900 leading-none mb-1">Comprovantes</p>
                      <p className="text-[11px] text-slate-500">2 arquivos com baixa resolução.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={() => setIsReportModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-3 h-14 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 font-bold"
              >
                <FileText className="h-5 w-5" />
                Gerar Novo Relatório
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Relatório */}
      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
    </div>
  )
}