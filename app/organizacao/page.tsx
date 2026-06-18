'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FolderTree,
  Folder,
  FolderOpen,
  FileText,
  FileSpreadsheet,
  File,
  ChevronRight,
  ChevronDown,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Link2,
  Unlink,
  Search,
  Filter,
  Calendar
} from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { StatsCard } from '@/components/stats-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSidebar } from '@/components/ui/sidebar'
import { mockProjects, mockDocuments, mockPlanoTrabalhoItems } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface TreeNode {
  id: string
  name: string
  type: 'category' | 'subcategory' | 'document'
  children?: TreeNode[]
  documents?: typeof mockDocuments
  approvedValue?: number
  usedValue?: number
  status?: 'ok' | 'warning' | 'error'
}

const buildTree = (): TreeNode[] => {
  return mockPlanoTrabalhoItems.map(item => ({
    id: item.id,
    name: `${item.code}. ${item.name}`,
    type: 'category' as const,
    approvedValue: item.approvedValue,
    usedValue: item.usedValue,
    status: item.usedValue > item.approvedValue ? 'error' : 
            item.usedValue > item.approvedValue * 0.9 ? 'warning' : 'ok',
    children: item.subcategories?.map(sub => ({
      id: sub.id,
      name: `${sub.code}. ${sub.name}`,
      type: 'subcategory' as const,
      approvedValue: sub.approvedValue,
      usedValue: sub.usedValue,
      status: sub.usedValue > sub.approvedValue ? 'error' : 
              sub.usedValue > sub.approvedValue * 0.9 ? 'warning' : 'ok',
      documents: mockDocuments.filter(d => 
        d.category === item.name || 
        d.category === sub.name.split('. ')[1]
      )
    }))
  }))
}

const orphanDocuments = mockDocuments.filter(doc => 
  !doc.category && doc.type !== 'plano_trabalho'
)

export default function OrganizacaoPage() {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === 'collapsed'
  const [activeTab, setActiveTab] = useState<'analise' | 'estrutura'>('analise')

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['pt-001', 'pt-002', 'pt-003']))
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  
  const treeData = buildTree()

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'warning': return <Clock className="h-4 w-4 text-amber-500" />
      case 'ok': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      default: return null
    }
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'nota_fiscal': return <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
      case 'comprovante': return <File className="h-4 w-4 text-slate-500" />
      default: return <FileText className="h-4 w-4 text-slate-500" />
    }
  }

  const TreeItem = ({ node, level = 0 }: { node: TreeNode; level?: number }) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0
    const hasDocuments = node.documents && node.documents.length > 0

    return (
      <div>
        <div
          className={cn(
            'flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors hover:bg-slate-50',
            level > 0 && 'ml-6'
          )}
          onClick={() => toggleNode(node.id)}
        >
          {(hasChildren || hasDocuments) ? (
            isExpanded ? <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" /> : <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
          ) : (
            <div className="w-4" />
          )}
          
          {node.type === 'category' ? (
            isExpanded ? <FolderOpen className="h-5 w-5 text-slate-500 shrink-0" /> : <Folder className="h-5 w-5 text-slate-500 shrink-0" />
          ) : (
            <Folder className="h-4 w-4 text-slate-400 shrink-0" />
          )}
          
          <span className={cn('flex-1 text-sm truncate', node.type === 'category' ? 'font-medium text-slate-900' : 'text-slate-700')}>
            {node.name}
          </span>

          {node.approvedValue && (
            <div className="flex items-center gap-3">
              {getStatusIcon(node.status)}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                      {((node.usedValue || 0) / node.approvedValue * 100).toFixed(0)}%
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Utilizado: {node.usedValue?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <p>Aprovado: {node.approvedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          {hasDocuments && (
            <Badge className="bg-slate-100 text-slate-600 text-xs border border-slate-200 shadow-none">
              {node.documents!.length} docs
            </Badge>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              {hasChildren && node.children!.map(child => <TreeItem key={child.id} node={child} level={level + 1} />)}
              {hasDocuments && (
                <div className="ml-12 space-y-1 pb-2">
                  {node.documents!.map(doc => (
                    <div key={doc.id} className="flex items-center gap-2 py-1.5 px-3 rounded-md hover:bg-slate-50 transition-colors">
                      {getDocumentIcon(doc.type)}
                      <span className="flex-1 text-sm text-slate-700 truncate">{doc.name}</span>
                      <Badge className={cn('text-xs rounded-full border shadow-none px-2.5 py-0.5', doc.status === 'aprovado' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : doc.status === 'com_divergencia' ? 'bg-rose-50 text-rose-700 border-rose-100' : doc.status === 'analisado' ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-amber-50 text-amber-700 border-amber-100')}>
                        {doc.status === 'aprovado' ? 'Aprovado' : doc.status === 'com_divergencia' ? 'Divergência' : doc.status === 'analisado' ? 'Analisado' : 'Pendente'}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-slate-800"><Link2 className="h-3 w-3" /></Button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
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
            <span className="text-slate-900">Organização</span>
          </nav>

          <div className="flex flex-wrap items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-44 bg-white border-slate-200 text-slate-700 shadow-sm rounded-xl">
                <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm rounded-xl">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <StatsCard title="Total de Documentos" value="50" icon={FileText} variant="default" />
            <StatsCard title="Classificados" value="42" icon={CheckCircle2} variant="success" />
            <StatsCard title="Pendentes" value="8" icon={Clock} variant="warning" />
            <StatsCard title="Com Divergências" value={orphanDocuments.length.toString()} icon={Unlink} variant="destructive" />
          </div>

          <div className="grid gap-6 lg:grid-cols-3 w-full">
            <div className="lg:col-span-2 rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FolderTree className="h-5 w-5 text-slate-500" />
                  <h3 className="text-xl font-bold text-slate-900">Estrutura do Plano de Trabalho</h3>
                </div>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Buscar documentos ou categorias..." className="pl-9 bg-white border-slate-200 focus-visible:ring-slate-300 rounded-xl" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>

              <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2">
                {treeData.map(node => <TreeItem key={node.id} node={node} />)}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-0">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Resumo da Análise</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Documentos classificados</span>
                    <span className="font-semibold text-slate-900">42</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-emerald-600" style={{ width: '84%' }} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>84% classificados</span>
                    <span>8 pendentes</span>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">35 documentos</p>
                        <p className="text-xs text-slate-500">Corretamente vinculados</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">7 documentos</p>
                        <p className="text-xs text-slate-500">Precisam de revisão</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Unlink className="h-5 w-5 text-rose-500" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{orphanDocuments.length} documentos</p>
                        <p className="text-xs text-slate-500">Com divergências</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-0">
                <div className="flex items-center gap-2 mb-4">
                  <Unlink className="h-5 w-5 text-rose-500" />
                  <h3 className="text-lg font-bold text-slate-900">Documentos com Divergências</h3>
                </div>
                {orphanDocuments.length > 0 ? (
                  <div className="space-y-2">
                    {orphanDocuments.slice(0, 5).map(doc => (
                      <div key={doc.id} className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
                        {getDocumentIcon(doc.type)}
                        <span className="flex-1 text-sm text-slate-900 truncate">{doc.name}</span>
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer">Revisar</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                    <p className="text-sm text-slate-500">Todos os documentos estão conformes</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}