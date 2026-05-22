'use client'

import { X, FileSpreadsheet, Download } from 'lucide-react'
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function ReportModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-0 border-none bg-transparent shadow-none outline-none [&>button]:hidden">
        
        {/* Adicionando títulos invisíveis para o erro sumir */}
        <DialogTitle className="sr-only">Gerar Novo Relatório</DialogTitle>
        <DialogDescription className="sr-only">
          Selecione o período e formato para exportar os dados.
        </DialogDescription>

        <div className="bg-[#f0f7ff] rounded-[32px] overflow-hidden border border-blue-100 shadow-2xl p-10">
          <div className="flex justify-between items-start mb-8">
            <div className="bg-blue-100 p-4 rounded-[20px]">
              <FileSpreadsheet className="h-7 w-7 text-blue-600" />
            </div>
            <button onClick={onClose} className="text-blue-400 hover:text-blue-600 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-2 mb-10">
            <h2 className="text-[#1e40af] font-bold text-2xl tracking-tight">Gerar Novo Relatório</h2>
            <p className="text-blue-600/70 text-sm font-medium">Exportação de dados para Prestação de Contas.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[#1e40af] font-bold text-[11px] uppercase tracking-[0.2em]">Período de Referência</label>
              <select className="w-full bg-white border border-blue-200 rounded-2xl p-4 text-sm text-[#1e40af] outline-none shadow-sm font-bold appearance-none cursor-pointer">
                <option>Outubro - Dezembro 2024</option>
                <option>Janeiro - Março 2025</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[#1e40af] font-bold text-[11px] uppercase tracking-[0.2em]">Formato de Saída</label>
              <div className="grid grid-cols-2 gap-4">
                <button className="border-2 border-blue-100 rounded-2xl p-4 text-sm font-black text-blue-500 bg-white hover:bg-blue-50 transition-all">PDF</button>
                <button className="border-2 border-blue-500 rounded-2xl p-4 text-sm font-black text-blue-600 bg-blue-50 transition-all">EXCEL</button>
              </div>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black h-14 rounded-[20px] mt-10 flex gap-3 shadow-lg shadow-blue-200/50 text-base">
            <Download className="h-5 w-5" /> Exportar Dados
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}