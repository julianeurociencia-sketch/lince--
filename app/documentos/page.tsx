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
  AlertCircle
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
    pendente: { label: 'Pendente', color: 'bg-amber-100 text-amber-700' },
    analisado: { label: 'Analisado', color: 'bg-blue-100 text-blue-700' },
    aprovado: { label: 'Aprovado', color: 'bg-emerald-100 text-emerald-700' },
    com_divergencia: { label: 'Divergência', color: 'bg-red-100 text-red-700' }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-blue-50 overflow-x-hidden">
      <Sidebar />
      
      {/* Header Fixo */}
      <div className="fixed top-0 left-0 right-0 z-30 w-full bg-blue-900 shadow-lg">
        <div className={cn(
          "transition-all duration-300 ease-linear",
          isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
        )}>
          <Header title="Documentos" />
        </div>
      </div>
      
      <div className={cn(
        "flex-1 w-full pt-20 transition-all duration-300 ease-linear",
        isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
      )}>
        <main className="p-6 space-y-6 w-full">
          
          {/* Ações de Topo */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                <Input 
                  placeholder="Buscar documentos..." 
                  className="pl-9 bg-white border-blue-200 focus:border-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="border-blue-200 text-blue-700 bg-white">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
            
            {/* BOTÃO CORRIGIDO: Agora ele abre o modal ao clicar */}
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Documento
            </Button>
          </div>

          {/* Stats rápidos */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
            <StatsCard title="Total Docs" value={mockDocuments.length} icon={FileText} />
            <StatsCard title="Aprovados" value="128" icon={FileCheck} />
            <StatsCard title="Em Análise" value="45" icon={Clock} />
            <StatsCard title="Divergências" value="12" icon={AlertCircle} />
          </div>

          {/* Lista de Documentos */}
          <div className="bg-[#ebf2ff] rounded-xl border border-blue-100 shadow-sm overflow-hidden w-full">
            <div className="p-5 border-b border-blue-200/50 flex items-center justify-between">
              <h3 className="font-bold text-blue-900">Todos os Documentos</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white text-blue-600 border-blue-200">
                  {mockDocuments.length} itens
                </Badge>
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#d6e4ff] text-blue-900">
                  <tr>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-[11px]">Nome do Arquivo</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-[11px]">Categoria</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-[11px]">Data</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-[11px]">Status</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-[11px] text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-200/50">
                  {mockDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-blue-200/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-blue-900">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-blue-700">{doc.category || 'Não classificado'}</td>
                      <td className="px-6 py-4 text-blue-600 font-mono text-xs">{doc.uploadedAt}</td>
                      <td className="px-6 py-4">
                        <Badge className={cn("px-2 py-0.5", statusConfig[doc.status as keyof typeof statusConfig]?.color)}>
                          {statusConfig[doc.status as keyof typeof statusConfig]?.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:text-blue-600">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border-blue-100">
                            <DropdownMenuItem className="text-blue-700 focus:bg-blue-50">
                              <Eye className="h-4 w-4 mr-2" /> Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-blue-700 focus:bg-blue-50">
                              <Download className="h-4 w-4 mr-2" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:bg-red-50">
                              <Trash2 className="h-4 w-4 mr-2" /> Excluir
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

      {/* COMPONENTE DO MODAL: Adicionado aqui para renderizar na tela */}
      <FileUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </div>
  )
}