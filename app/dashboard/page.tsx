'use client'

import { motion } from 'framer-motion'
import {
  FolderKanban,
  AlertTriangle,
  FileCheck2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Filter,
  Eye,
  Clock
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Line
} from 'recharts'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { StatsCard } from '@/components/stats-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSidebar } from '@/components/ui/sidebar'
import {
  mockDashboardStats,
  mockProjects,
  mockCategoryData,
  mockTimelineData
} from '@/lib/mock-data'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    maximumFractionDigits: 1
  })
}

const statusConfig = {
  em_analise: { label: 'Em Análise', color: 'bg-amber-100 text-amber-700' },
  aprovado: { label: 'Aprovado', color: 'bg-emerald-100 text-emerald-700' },
  com_divergencias: { label: 'Com Divergências', color: 'bg-red-100 text-red-700' },
  finalizado: { label: 'Finalizado', color: 'bg-blue-100 text-blue-700' }
}

export default function DashboardPage() {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'

  return (
    <div className="min-h-screen w-full flex flex-col bg-blue-50 overflow-x-hidden">
      <Sidebar />
      
      {/* Header Fixo - Subtítulo Removido */}
      <div className="fixed top-0 left-0 right-0 z-30 w-full bg-blue-900 shadow-lg">
        <div className={cn(
          "transition-all duration-300 ease-linear",
          isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
        )}>
          <Header title="Dashboard" />
        </div>
      </div>
      
      <div className={cn(
        "flex-1 w-full pt-20 transition-all duration-300 ease-linear",
        isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
      )}>
        <main className="p-6 space-y-6 w-full">
          
          <div className="flex flex-wrap items-center gap-4">
            <Select defaultValue="2024">
              <SelectTrigger className="w-32 bg-white border-blue-100">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="bg-white border-blue-100 text-blue-600">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats Cards com fundo azul suave */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 w-full">
            <StatsCard title="Total de Divergências" value="5" icon={AlertTriangle} trend={{ value: 5, isPositive: false }} />
            <StatsCard title="Críticas" value="1" icon={AlertTriangle} />
            <StatsCard title="Pendentes" value="3" icon={Clock} trend={{ value: 3, isPositive: false }} />
            <StatsCard title="Valor Envolvido" value="R$ 736.500,00" icon={DollarSign} />
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full">
            <StatsCard title="Parcelas Analisadas" value="18" icon={FileCheck2} trend={{ value: 8, isPositive: true }} />
            <StatsCard title="Taxa de Compliance" value="81.5%" icon={ShieldCheck} trend={{ value: 3, isPositive: true }} />
          </div>

          {/* Gráfico de Barras com fundo azul suave */}
          <Card className="bg-[#ebf2ff] border-blue-100 shadow-sm w-full overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base font-medium text-blue-900">Gastos por Categoria</CardTitle>
              <CardDescription className="text-blue-600">Distribuição das despesas do seu projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockCategoryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#d6e4ff" vertical={false} />
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" width={120} fontSize={11} stroke="#5c85d6" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" style={{ fill: '#3b82f6' }} radius={[0, 4, 4, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Timeline com fundo azul suave */}
          <Card className="bg-[#ebf2ff] border-blue-100 shadow-sm w-full overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base font-medium text-blue-900">Timeline Financeira</CardTitle>
              <CardDescription className="text-blue-600">Comparativo entre planejado e executado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockTimelineData}>
                    <defs>
                      <linearGradient id="colorPlanejado" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d6e4ff" vertical={false} />
                    <XAxis dataKey="month" fontSize={12} stroke="#5c85d6" axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(v) => formatCurrency(v)} fontSize={12} stroke="#5c85d6" axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="planejado" stroke="#3b82f6" fill="url(#colorPlanejado)" strokeWidth={2} />
                    <Area type="monotone" dataKey="executado" stroke="#22d3ee" fill="transparent" strokeWidth={2} />
                    <Line type="monotone" dataKey="divergencias" stroke="#ef4444" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Tabela com fundo azul suave */}
          <Card className="bg-[#ebf2ff] border-blue-100 shadow-sm w-full overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-medium text-blue-900">Detalhamento do Projeto</CardTitle>
                <CardDescription className="text-blue-600">Visão consolidada do seu projeto financiado</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100" asChild>
                <Link href="/auditoria">Ver Tudo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto w-full">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#d6e4ff] text-blue-900">
                    <tr>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Convênio</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Projeto</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Valor Total</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px] text-center">Status</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px] text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProjects.filter(p => p.convenio === 'CONV-2024-001').map((project) => (
                      <tr key={project.id} className="border-b border-blue-200 hover:bg-blue-100/50 transition-colors">
                        <td className="px-4 py-4 font-mono text-blue-900">{project.convenio}</td>
                        <td className="px-4 py-4 font-medium text-blue-900">{project.name}</td>
                        <td className="px-4 py-4 text-blue-900">{formatCurrency(project.totalValue)}</td>
                        <td className="px-4 py-4 text-center">
                          <Badge className={cn("px-2 py-0.5", statusConfig[project.status as keyof typeof statusConfig]?.color)}>
                            {statusConfig[project.status as keyof typeof statusConfig]?.label}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-right">
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

function ArrowRight(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
}