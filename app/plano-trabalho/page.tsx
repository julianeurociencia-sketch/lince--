'use client'

import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'
import { useSidebar } from '@/components/ui/sidebar'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { cn } from '@/lib/utils'
import {
  AlertCircle,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CloudUpload,
  FileText,
  FileUp,
  Layers3,
  Wallet,
} from 'lucide-react'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_FORMATS = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
}

const formatFileSize = (bytes: number) => {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return `${Math.round(bytes / 1024)} KB`
}

const getUploadErrorMessage = (rejection: FileRejection) => {
  const error = rejection.errors[0]

  if (!error) {
    return 'Nao foi possivel validar o arquivo selecionado.'
  }

  if (error.code === 'file-too-large') {
    return 'O arquivo excede o limite de 10 MB.'
  }

  if (error.code === 'file-invalid-type') {
    return 'Formato invalido. Envie apenas arquivos PDF, DOCX ou XLSX.'
  }

  return 'Nao foi possivel enviar o arquivo. Tente novamente.'
}

export default function PlanoTrabalhoPage() {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState('')

  const quickLink = useMemo(
    () => ({ label: 'Notas Fiscais', href: '/upload-notas', icon: FileUp }),
    []
  )

  const handleDropAccepted = useCallback((acceptedFiles: File[]) => {
    const [file] = acceptedFiles

    if (!file) {
      return
    }

    setUploadedFile(file)
    setUploadError('')
    setUploadSuccess(`Arquivo "${file.name}" selecionado com sucesso.`)
  }, [])

  const handleDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const [rejection] = fileRejections

    if (!rejection) {
      return
    }

    setUploadedFile(null)
    setUploadSuccess('')
    setUploadError(getUploadErrorMessage(rejection))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPTED_FORMATS,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDropAccepted: handleDropAccepted,
    onDropRejected: handleDropRejected,
  })

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

      <div
        className={cn(
          'flex-1 w-full pt-24 transition-all duration-300 ease-linear',
          isSidebarCollapsed ? 'pl-[72px]' : 'pl-[72px] lg:pl-[260px]'
        )}
      >
        <main className="space-y-8 p-8 w-full max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            <span>Lince</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-slate-900">Plano de Trabalho</span>
          </nav>

          <section className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-gray-600">
                  Projeto atual: <span className="text-gray-900">Programa Energia do Futuro</span>
                </span>
              </div>

              <Link
                href={quickLink.href}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors cursor-pointer hover:border-[#708D7A] hover:text-[#708D7A] hover:bg-slate-50"
              >
                <quickLink.icon size={16} />
                <span>{quickLink.label}</span>
              </Link>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.95fr)_minmax(320px,1fr)]">
            <div className="space-y-6">
              <section className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Enviar plano de trabalho</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    O documento sera usado como referencia para cruzar todas as despesas do projeto.
                  </p>
                </div>

                <div
                  {...getRootProps()}
                  className={cn(
                    'group flex min-h-[214px] cursor-pointer items-center justify-center rounded-[22px] border-2 border-dashed p-12 text-center transition-colors',
                    isDragActive
                      ? 'border-emerald-500 bg-emerald-50/80'
                      : 'border-slate-200 bg-slate-50/80 hover:bg-slate-50'
                  )}
                >
                  <input {...getInputProps()} />
                  <div>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-transform group-hover:scale-105">
                      <CloudUpload className="h-8 w-8" />
                    </div>
                    <p className="text-lg font-semibold text-slate-900">
                      {isDragActive ? 'Solte o arquivo aqui' : 'Arraste o plano para ca ou clique para selecionar'}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">PDF, DOCX ou XLSX ate 10 MB</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {uploadError ? (
                    <div className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  ) : null}

                  {uploadSuccess ? (
                    <div className="flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                      <span>{uploadSuccess}</span>
                    </div>
                  ) : null}
                </div>
              </section>

              <section className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-center py-8">
                  <div className="w-full max-w-xl rounded-[24px] border border-slate-200 bg-white p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                      <FileText size={22} />
                    </div>
                    <p className="text-lg font-semibold text-slate-900">
                      {uploadedFile ? uploadedFile.name : 'Nenhum arquivo enviado ainda'}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {uploadedFile ? `${formatFileSize(uploadedFile.size)} • Pronto para processamento` : 'Selecione um arquivo valido para continuar'}
                    </p>
                    <div
                      className={cn(
                        'mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium',
                        uploadedFile
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      )}
                    >
                      <BadgeCheck size={16} />
                      {uploadedFile ? 'Arquivo valido' : 'Aguardando envio'}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h3 className="text-lg font-bold text-slate-900">Dados identificados</h3>
                <p className="mb-6 mt-3 text-sm text-gray-500">Resumo extraido do plano vigente</p>

                <div className="space-y-3">
                  <InfoItem icon={<Layers3 size={18} />} title="5 rubricas" subtitle="Categorias de despesa" />
                  <InfoItem icon={<Wallet size={18} />} title="R$ 420.000,00" subtitle="Valor total aprovado" />
                  <InfoItem icon={<CalendarDays size={18} />} title="Jan 2025 ate Dez 2026" subtitle="Periodo de vigencia" />
                </div>
              </section>

              <section className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h3 className="text-lg font-bold text-slate-900">Rubricas e limites</h3>
                <div className="mt-6 space-y-4">
                  <LimitBar label="Equipamentos e material permanente" value="R$ 150.000,00" percent={82} />
                  <LimitBar label="Material de consumo" value="R$ 80.000,00" percent={64} />
                  <LimitBar label="Diarias e ajuda de custo" value="R$ 60.000,00" percent={58} />
                  <LimitBar label="Obras e instalacoes" value="R$ 130.000,00" percent={91} />
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
