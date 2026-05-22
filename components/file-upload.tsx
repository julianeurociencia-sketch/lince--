"use client"

import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'
// ADICIONADO: DialogTitle e DialogDescription para acessibilidade
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog'

// Conteúdo auxiliar
const manualContent = {
  'Passagens e locomoções': {
    exigencias: [
      'Nota fiscal da agência ou confirmação de compra (com atesto)',
      'Comprovante de pagamento (para compras após 01/09/2017)',
      'Comprovante de embarque / e-ticket (Obrigatório para voos)'
    ],
    compliance: [
      'Viagens nacionais de 1 dia devem ser sem despacho de bagagem (exceções exigem justificativa).',
      'Cartão de crédito pessoal só é aceito para passagens aéreas.'
    ],
    citeExigencia: '[CITE: 1, 347]',
  }
}

type UploadFile = {
  file: File
  progress: number
}

function useSimulatedUpload() {
  const [uploads, setUploads] = useState<UploadFile[]>([])

  useEffect(() => {
    if (uploads.length === 0) return

    const timers: number[] = []
    uploads.forEach((u, idx) => {
      if (u.progress >= 100) return
      const id = window.setInterval(() => {
        setUploads(prev => prev.map((p, i) => i === idx ? { ...p, progress: Math.min(100, p.progress + Math.random() * 20) } : p))
      }, 400)
      timers.push(id)
    })

    return () => timers.forEach(t => clearInterval(t))
  }, [uploads])

  const addFiles = (files: File[], maxFiles: number) => {
    setUploads(prev => {
      const newOnes = files.slice(0, Math.max(0, maxFiles - prev.length)).map(f => ({ file: f, progress: 0 }))
      return [...prev, ...newOnes]
    })
  }

  return { uploads, addFiles, setUploads }
}

export function FileUploadCore({ maxFiles = 1, compact = false }: { maxFiles?: number, compact?: boolean }) {
  const { uploads, addFiles } = useSimulatedUpload()
  const onDrop = useCallback((acceptedFiles: File[]) => addFiles(acceptedFiles, maxFiles), [addFiles, maxFiles])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: maxFiles > 1 })

  return (
    <div>
      <div {...getRootProps()} className={cn('border-2 border-dashed border-blue-300 rounded-lg p-4 text-center hover:border-blue-400 transition-all cursor-pointer bg-white', compact ? 'p-3' : '')}>
        <input {...getInputProps()} />
        <Upload className="h-6 w-6 text-blue-500 mx-auto mb-2" />
        <div className="text-sm text-blue-700 font-medium">Arraste os arquivos aqui ou clique para selecionar</div>
        <div className="text-xs text-blue-500 mt-1">Máx. {maxFiles} arquivo(s)</div>
      </div>

      {uploads.length > 0 && (
        <div className="mt-3 space-y-2 text-left text-sm">
          {uploads.map((u, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1 truncate">{u.file.name}</div>
              <div className="w-40 bg-blue-100 rounded-full h-2 overflow-hidden">
                <div style={{ width: `${u.progress}%` }} className="h-full bg-blue-600 transition-all" />
              </div>
              <div className="w-8 text-xs text-blue-600 text-right">{Math.round(u.progress)}%</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function FileUpload({ maxFiles = 1 }: { maxFiles?: number }) {
  return <FileUploadCore maxFiles={maxFiles} />
}

export function FileUploadModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [selectedRubrica, setSelectedRubrica] = useState('Passagens e locomoções')
  const currentContent = manualContent[selectedRubrica as keyof typeof manualContent]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] w-[95vw] p-0 border-none bg-transparent shadow-none outline-none [&>button]:hidden">
        
        {/* CORREÇÃO AQUI: Títulos invisíveis para acessibilidade */}
        <DialogTitle className="sr-only">Upload e Classificação Petrobras</DialogTitle>
        <DialogDescription className="sr-only">
          Selecione a rubrica e faça o upload dos documentos conforme o manual de PD&I.
        </DialogDescription>

        <div className="bg-[#f0f7ff] rounded-[24px] overflow-hidden flex relative h-[600px] max-h-[85vh] border border-blue-100 shadow-2xl">
          <button onClick={onClose} className="absolute right-6 top-6 text-blue-400 hover:text-blue-600 z-50">
            <X className="h-6 w-6" />
          </button>

          <div className="w-[45%] p-10 flex flex-col justify-center bg-[#e1efff] border-r border-blue-100">
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-[#1e40af] font-bold text-xl flex items-center gap-2">
                  <Upload className="h-5 w-5" /> Upload Petrobras
                </h2>
                <p className="text-blue-600/70 text-[11px]">Selecione a rubrica para classificar.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[#1e40af] font-bold text-[11px] uppercase tracking-wider">Rubrica</label>
                <select 
                  value={selectedRubrica}
                  onChange={(e) => setSelectedRubrica(e.target.value)}
                  className="w-full bg-white border border-blue-200 rounded-lg p-3 text-sm text-[#1e40af] outline-none shadow-sm font-medium"
                >
                  {Object.keys(manualContent).map((rubrica) => (
                    <option key={rubrica} value={rubrica}>{rubrica}</option>
                  ))}
                </select>
              </div>

              <div className="text-sm text-blue-600/80">Arraste ou selecione o(s) arquivo(s) e visualize o progresso à direita.</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white p-8">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="relative pl-4">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-500"></div>
                  <h4 className="text-[#1e3a8a] font-bold text-[13px] uppercase leading-tight">EXIGÊNCIAS: MANUAL PD&I {currentContent?.citeExigencia}</h4>
                </div>

                <div className="space-y-4">
                  <p className="text-[13px] font-bold text-blue-900">Documentos Obrigatórios:</p>
                  <ul className="text-[13px] space-y-4 text-[#3b60c0] font-medium leading-relaxed">
                    {currentContent?.exigencias?.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-blue-400 font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-[#fff5f5] p-6 rounded-2xl border border-red-100 space-y-4">
                <h4 className="text-[#8b1a1a] font-bold text-[13px] uppercase">Regras de Compliance:</h4>
                <ul className="text-[12px] space-y-4 text-[#c03b3b] font-medium italic leading-relaxed">
                  {currentContent?.compliance?.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <FileUploadCore maxFiles={1} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}