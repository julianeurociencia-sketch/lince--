'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  CloudUpload,
  FileText,
  Scan,
  Trash2,
} from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_FORMATS = {
  'application/pdf': ['.pdf'],
  'application/xml': ['.xml'],
  'text/xml': ['.xml'],
}

type QueuedFile = {
  id: string
  file: File
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
    return `Nao foi possivel validar o arquivo "${rejection.file.name}".`
  }

  if (error.code === 'file-too-large') {
    return `O arquivo "${rejection.file.name}" excede o limite de 10 MB.`
  }

  if (error.code === 'file-invalid-type') {
    return `O arquivo "${rejection.file.name}" nao e valido. Envie apenas PDF ou XML.`
  }

  return `Nao foi possivel enviar o arquivo "${rejection.file.name}".`
}

export default function UploadNotasPage() {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'
  const [queuedFiles, setQueuedFiles] = useState<QueuedFile[]>([])
  const [uploadErrors, setUploadErrors] = useState<string[]>([])
  const [uploadSuccess, setUploadSuccess] = useState('')

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    const nextFiles = acceptedFiles.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      file,
    }))

    setQueuedFiles((current) => {
      const existingIds = new Set(current.map((item) => item.id))
      const dedupedFiles = nextFiles.filter((item) => !existingIds.has(item.id))
      return [...current, ...dedupedFiles]
    })

    setUploadErrors([])
    setUploadSuccess(
      acceptedFiles.length === 1
        ? `Arquivo "${acceptedFiles[0].name}" selecionado com sucesso.`
        : `${acceptedFiles.length} arquivos selecionados com sucesso.`
    )
  }, [])

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    setUploadSuccess('')
    setUploadErrors(fileRejections.map(getUploadErrorMessage))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPTED_FORMATS,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
    onDropAccepted,
    onDropRejected,
  })

  const removeFile = useCallback((id: string) => {
    setQueuedFiles((current) => current.filter((item) => item.id !== id))
  }, [])

  const fileCountLabel = useMemo(() => {
    if (queuedFiles.length === 0) {
      return 'Nenhum arquivo'
    }

    if (queuedFiles.length === 1) {
      return '1 Arquivo'
    }

    return `${queuedFiles.length} Arquivos`
  }, [queuedFiles.length])

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
        <main className="p-8 space-y-8 w-full max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            <span>Lince</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-slate-900">Upload de Notas</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-start justify-end gap-4 border-b border-slate-200 pb-8"
          >
            <div className="bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Parcela 03/06</span>
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.95fr)_minmax(340px,1fr)]">
            <div className="space-y-8">
              <section className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Enviar arquivos</h3>
                  <p className="text-sm text-slate-500 mt-1">Voce pode enviar multiplos arquivos PDF ou XML simultaneamente.</p>
                </div>

                <div
                  {...getRootProps()}
                  className={cn(
                    'rounded-[22px] border-2 border-dashed px-6 py-16 text-center cursor-pointer transition-all group',
                    isDragActive
                      ? 'border-emerald-500 bg-emerald-50/80'
                      : 'border-slate-200 bg-slate-50/80 hover:bg-slate-50'
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-[#708D7A] shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    <CloudUpload className="h-10 w-10" />
                  </div>
                  <p className="text-lg font-bold text-slate-900">
                    {isDragActive ? 'Solte os arquivos aqui' : 'Arraste as notas e comprovantes'}
                  </p>
                  <p className="mt-2 text-sm text-slate-400 font-medium">Clique para selecionar PDF ou XML de ate 10 MB cada</p>
                </div>

                <div className="mt-4 space-y-2">
                  {uploadErrors.map((message) => (
                    <div
                      key={message}
                      className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                      <span>{message}</span>
                    </div>
                  ))}

                  {uploadSuccess ? (
                    <div className="flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                      <span>{uploadSuccess}</span>
                    </div>
                  ) : null}
                </div>
              </section>

              <section className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">Arquivos na fila</h3>
                  <Badge className="bg-slate-100 text-slate-700 border-slate-200 font-bold uppercase tracking-wider text-[10px] shadow-none">
                    {fileCountLabel}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {queuedFiles.length > 0 ? (
                    queuedFiles.map((item) => (
                      <FileItem
                        key={item.id}
                        name={item.file.name}
                        size={formatFileSize(item.file.size)}
                        onRemove={() => removeFile(item.id)}
                      />
                    ))
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                      Nenhum arquivo selecionado ainda.
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="rounded-[24px] bg-slate-900 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#708D7A]/10 rounded-full blur-3xl group-hover:bg-[#708D7A]/20 transition-colors" />
                <h3 className="text-xl font-bold mb-3 relative z-10">Analisar parcela</h3>
                <p className="text-sm leading-relaxed text-slate-400 mb-8 relative z-10">
                  O LINCE fara o cruzamento triplo entre a Nota Fiscal, o Comprovante de Pagamento e as Rubricas do Plano de Trabalho.
                </p>
                <button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-950/20 cursor-pointer">
                  <Scan size={22} />
                  Iniciar Processamento
                </button>
              </section>

              <section className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  Checklist de Envio
                </h3>
                <ul className="space-y-6">
                  <ChecklistItem text="Confirme que o plano de trabalho vigente ja foi enviado." />
                  <ChecklistItem text="Envie o comprovante bancario vinculado a cada nota fiscal." />
                  <ChecklistItem text="Verifique se as notas estao no nome da instituicao correta." />
                  <ChecklistItem text="As datas de emissao devem estar dentro da vigencia." />
                </ul>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function FileItem({
  name,
  size,
  onRemove,
}: {
  name: string
  size: string
  onRemove: () => void
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition-shadow group hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-500">
          <FileText size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{name}</p>
          <p className="text-xs text-slate-400">{size}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500 cursor-pointer"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <li className="flex gap-4">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle2 size={14} className="text-emerald-600" />
      </div>
      <span className="text-sm leading-tight text-slate-600">{text}</span>
    </li>
  )
}
