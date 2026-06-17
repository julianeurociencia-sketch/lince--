'use client'

import { useSidebar } from '@/components/ui/sidebar'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { cn } from '@/lib/utils'
import {
  CloudUpload,
  FileText,
  BadgeCheck,
  Layers3,
  Wallet,
  CalendarDays,
  ChevronRight
} from 'lucide-react'

export default function PlanoTrabalhoPage() {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'

  return (
    <div className="min-h-screen w-full flex flex-col bg-blue-50 overflow-x-hidden">
      <Sidebar />

      <div className="fixed top-0 left-0 right-0 z-30 w-full bg-blue-900 shadow-lg">
        <div
          className={cn(
            'transition-all duration-300 ease-linear',
            isSidebarCollapsed ? 'pl-[72px]' : 'pl-[72px] lg:pl-[260px]'
          )}
        >
          <Header title="" />
        </div>
      </div>

      <div
        className={cn(
          'flex-1 w-full pt-20 transition-all duration-300 ease-linear',
          isSidebarCollapsed ? 'pl-[72px]' : 'pl-[72px] lg:pl-[260px]'
        )}
      >
        <main className="p-6 space-y-6 w-full">
          <div className="flex flex-wrap items-start justify-end gap-4 border-b border-slate-200 pb-6">

            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-600">
                Projeto atual: <span className="text-gray-900">Programa Energia do Futuro</span>
              </span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.95fr)_minmax(320px,1fr)]">
            <div className="space-y-6">
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Enviar plano de trabalho</h3>
                  <p className="mt-3 text-sm text-gray-500">
                    O documento será usado como referência para cruzar todas as despesas do projeto.
                  </p>
                </div>

                <div className="flex min-h-[214px] cursor-pointer items-center justify-center rounded-[22px] border-2 border-dashed border-slate-200 bg-slate-50/80 p-12 text-center transition-colors hover:bg-slate-50 group">
                  <div>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-transform group-hover:scale-110">
                      <CloudUpload className="h-8 w-8" />
                    </div>
                    <p className="text-lg font-semibold text-slate-900">Arraste o plano para cá</p>
                    <p className="mt-2 text-xs text-slate-500">PDF, DOCX ou XLSX até 10 MB</p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-center py-8">
                  <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                      <FileText size={22} />
                    </div>
                    <p className="text-lg font-semibold text-slate-900">Plano_de_Trabalho_Aprovado.pdf</p>
                    <p className="mt-1 text-sm text-slate-500">1,8 MB • Processado pelo LINCE</p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                      <BadgeCheck size={16} />
                      Ativo
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Dados identificados</h3>
                <p className="mb-6 mt-3 text-sm text-gray-500">Resumo extraído do plano vigente</p>

                <div className="space-y-3">
                  <InfoItem icon={<Layers3 size={18} />} title="5 rubricas" subtitle="Categorias de despesa" />
                  <InfoItem icon={<Wallet size={18} />} title="R$ 420.000,00" subtitle="Valor total aprovado" />
                  <InfoItem icon={<CalendarDays size={18} />} title="Jan 2025 – Dez 2026" subtitle="Período de vigência" />
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Rubricas e limites</h3>
                <div className="mt-6 space-y-4">
                  <LimitBar label="Equipamentos e material permanente" value="R$ 150.000,00" percent={82} />
                  <LimitBar label="Material de consumo" value="R$ 80.000,00" percent={64} />
                  <LimitBar label="Diárias e ajuda de custo" value="R$ 60.000,00" percent={58} />
                  <LimitBar label="Obras e instalações" value="R$ 130.000,00" percent={91} />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function InfoItem({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  )
}

function LimitBar({ label, value, percent }: { label: string; value: string; percent: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="text-slate-700">{label}</span>
        <span className="text-slate-500">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-emerald-600" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
