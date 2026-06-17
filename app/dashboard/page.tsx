'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { useSidebar } from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, CalendarDays, CheckCircle2, FileText, HelpCircle, PackageSearch, TriangleAlert, ChevronRight } from 'lucide-react'

const stats = [
  {
    label: 'Convênio',
    value: '5900.0123456.25.4',
  },
  {
    label: 'Parcela atual',
    value: '03 de 06',
  },
  {
    label: 'Prazo para envio',
    value: '18 dias',
    icon: CalendarDays,
  },
  {
    label: 'Índice de conformidade',
    value: '+12% desde a última análise',
    tone: 'text-emerald-600',
  },
]

const priorityItems = [
  {
    amount: 'R$ 8.920,00',
    reference: 'NF 003.847',
    title: 'Nota fiscal sem comprovante',
    category: 'Equipamentos e material permanente',
    status: 'Crítica',
    statusTone: 'bg-rose-100 text-rose-700 border-rose-200',
    icon: TriangleAlert,
  },
  {
    amount: 'R$ 18.600,00',
    reference: 'NF 001.192',
    title: 'Valor acima do previsto',
    category: 'Diárias e ajuda de custo',
    status: 'Revisar',
    statusTone: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: PackageSearch,
  },
  {
    amount: 'R$ 8.420,00',
    reference: 'NF 009.301',
    title: 'Data fora da vigência',
    category: 'Material de consumo',
    status: 'Sem correspondência',
    statusTone: 'bg-slate-100 text-slate-600 border-slate-200',
    icon: HelpCircle,
  },
]

export default function DashboardPage() {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F5F3EF] overflow-x-hidden">
      <Sidebar />

      <div className="fixed top-0 left-0 right-0 z-30 w-full bg-white shadow-sm">
        <div
          className={cn(
            'transition-all duration-300 ease-linear',
            isSidebarCollapsed ? 'pl-[72px]' : 'pl-[72px] lg:pl-[260px]'
          )}
        >
          <Header title="" />
        </div>
      </div>

      <div className={cn(
        'flex-1 w-full pt-24 transition-all duration-300 ease-linear',
        isSidebarCollapsed ? 'pl-[72px]' : 'pl-[72px] lg:pl-[260px]'
      )}>
        <main className="space-y-8 p-8 w-full max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            <span>Lince</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-slate-900">Visão Geral</span>
          </nav>
          <section className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-8">
              <div className="rounded-2xl bg-gray-50 px-5 py-4 border border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Projeto atual</div>
                <div className="mt-2 flex items-center gap-2 text-base font-bold text-[#1F2937]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                  Programa Energia do Futuro
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-4">
              {stats.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="p-2">
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {Icon ? <Icon className="h-4 w-4 text-[#708D7A]" /> : null}
                      <p className={cn('text-xl font-bold text-[#1F2937]', item.tone)}>{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
            <div className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <p className="text-lg font-bold text-[#1F2937]">Panorama da análise</p>
              <p className="text-sm text-gray-500">Cruzamento automático desta parcela</p>

              <div className="mt-8 flex flex-col items-center justify-center">
                <div className="relative flex h-60 w-60 items-center justify-center rounded-full bg-[conic-gradient(#708D7A_0_87%,#F3F4F6_87%_100%)]">
                  <div className="flex h-52 w-52 items-center justify-center rounded-full bg-white shadow-inner">
                    <div className="text-center">
                      <p className="text-5xl font-bold tracking-tighter text-[#1F2937]">87%</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Conformidade</p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-sm font-bold text-[#708D7A] bg-[#708D7A]/10 px-4 py-1 rounded-full">Boa conformidade</p>
              </div>
            </div>

            <StatCard
              icon={FileText}
              label="DOCUMENTOS CONFORMES"
              value="42"
              footer="De 48 analisados"
            />
            <StatCard
              icon={TriangleAlert}
              label="PENDÊNCIAS"
              value="4"
              footer="2 podem bloquear o envio"
              footerTone="text-rose-600"
            />
            <StatCard
              icon={HelpCircle}
              label="SEM CORRESPONDÊNCIA"
              value="2"
              footer="Documentos fora do plano"
            />
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-[26px] font-semibold tracking-tight text-slate-900">Pendências prioritárias</h2>
                <p className="mt-1 text-sm text-slate-500">Itens que precisam da sua atenção</p>
              </div>
              <Button variant="ghost" className="h-auto p-0 text-base font-medium text-slate-700 hover:bg-transparent hover:text-slate-900">
                <span>Ver todas</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              {priorityItems.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.reference}
                    className="flex flex-col gap-5 rounded-[24px] border border-slate-200 bg-white px-5 py-5 shadow-[0_1px_0_rgba(15,23,42,0.02)] lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
                      <div className="min-w-[145px] border-b border-slate-200 pb-4 text-center lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5 lg:text-left">
                        <p className="text-[28px] font-semibold tracking-tight text-slate-900">{item.amount}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.reference}</p>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                          <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start lg:self-auto">
                      <Badge className={cn('rounded-full border px-4 py-2 text-sm font-medium', item.statusTone)}>
                        {item.status}
                      </Badge>
                      <Button variant="outline" className="rounded-full border-slate-200 bg-white px-4 text-slate-700 hover:bg-slate-50">
                        Revisar
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  footer,
  footerTone = 'text-slate-500',
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  footer: string
  footerTone?: string
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 ring-1 ring-slate-100">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-5 text-sm font-medium tracking-wide text-slate-500">{label}</p>
      <p className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">{value}</p>
      <p className={cn('mt-16 text-sm', footerTone)}>{footer}</p>
    </div>
  )
}
