'use client'

import { useState } from 'react'
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Download, 
  Trash2,
  FileCheck,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { StatsCard } from '@/components/stats-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSidebar } from '@/components/ui/sidebar'
import { mockDocuments } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

// Importação do componente de upload que vimos na sua pasta components
import { FileUploadModal } from '@/components/file-upload'

export default function DocumentosPage() {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'
  
  // Estados para busca e controle do Modal
  const [searchQuery, setSearchQuery] = useState('')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const statusConfig = {
    pendente: { label: 'Pendente', color: 'bg-amber-50 text-amber-700 border-amber-100' },
    analisado: { label: 'Analisado', color: 'bg-slate-50 text-slate-600 border-slate-200' },
    aprovado: { label: 'Aprovado', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    com_divergencia: { label: 'Divergência', color: 'bg-rose-50 text-rose-700 border-rose-100' }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F5F3EF] overflow-x-hidden">
      <Sidebar />
      
      {/* Header Fixo */}
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
            <span className="text-slate-900">Documentos</span>
          </nav>
          
          {/* Ações de Topo */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Buscar documentos..." 
                  className="pl-9 bg-white border-slate-200 focus-visible:ring-slate-300 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm rounded-xl">
                <Filter className="h-4 w-4 mr-2 text-slate-500" />
                Filtros
              </Button>
            </div>
            
            <Button 
              className="bg-[#708D7A] hover:bg-[#708D7A]/90 text-white font-semibold rounded-xl shadow-sm cursor-pointer"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Documento
            </Button>
          </div>

          {/* Stats rápidos */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
            <StatsCard title="Total Docs" value={mockDocuments.length} icon={FileText} variant="default" />
            <StatsCard title="Aprovados" value="128" icon={FileCheck} variant="success" />
            <StatsCard title="Em Análise" value="45" icon={Clock} variant="warning" />
            <StatsCard title="Divergências" value="12" icon={AlertCircle} variant="destructive" />
          </div>

          {/* Lista de Documentos */}
          <div className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-0 w-full overflow-hidden">
            <div className="pb-6 border-b border-slate-100 flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Todos os Documentos</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 rounded-full font-semibold shadow-none px-2.5 py-0.5 text-xs">
                  {mockDocuments.length} itens
                </Badge>
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-sm text-left">
                <thead className="text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Nome do Arquivo</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Categoria</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Data</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px] text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-50 text-slate-500 rounded-lg">
                            <FileText className="h-4 w-4" />
                          </div>
                          <span className="font-semibold text-slate-900">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{doc.category || 'Não classificado'}</td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-xs">{doc.uploadedAt}</td>
                      <td className="px-6 py-4">
                        <Badge className={cn("px-2.5 py-0.5 rounded-full border shadow-none text-xs font-semibold", statusConfig[doc.status as keyof typeof statusConfig]?.color)}>
                          {statusConfig[doc.status as keyof typeof statusConfig]?.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 cursor-pointer">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border-slate-200 rounded-xl shadow-lg">
                            <DropdownMenuItem className="text-slate-700 focus:bg-slate-50 focus:text-slate-900 cursor-pointer">
                              <Eye className="h-4 w-4 mr-2 text-slate-500" /> Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-700 focus:bg-slate-50 focus:text-slate-900 cursor-pointer">
                              <Download className="h-4 w-4 mr-2 text-slate-500" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer">
                              <Trash2 className="h-4 w-4 mr-2 text-rose-500" /> Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* COMPONENTE DO MODAL */}
      <FileUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </div>
  )
}