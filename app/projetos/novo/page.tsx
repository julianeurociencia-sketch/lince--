'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, ArrowRight, Building2, Calendar, 
  DollarSign, FileText, Hash, Loader2, 
  MapPin, User, CheckCircle2, Upload
} from 'lucide-react'

// Layout & UI
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, name: 'Dados Básicos', description: 'Informações do projeto' },
  { id: 2, name: 'Responsável', description: 'Dados do gestor' },
  { id: 3, name: 'Financeiro', description: 'Valores e parcelas' },
  { id: 4, name: 'Documentos', description: 'Upload de arquivos' },
]

const areas = [
  'Pesquisa e Desenvolvimento', 'Engenharia de Processos', 'Meio Ambiente',
  'Tecnologia da Informação', 'Energia Renovável', 'Logística e Transporte'
]

export default function NovoProjetoPage() {
  const router = useRouter()
  const { state } = useSidebar()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    nomeProjeto: '', numeroConvenio: '', descricao: '', area: '',
    dataInicio: '', dataTermino: '', nomeResponsavel: '', cpfCnpj: '',
    nomeInstituicao: '', emailResponsavel: '', telefone: '',
    valorTotal: '', numeroParcelas: '', observacoesFinanceiras: ''
  })

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Funções de Formatação
  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (!numbers) return ''
    const amount = parseFloat(numbers) / 100
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
  }

  const formatCPFCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.length <= 11 
      ? numbers.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      : numbers.substring(0,14).replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2')
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 2000))
    router.push('/dashboard')
  }

  const isSidebarCollapsed = state === 'collapsed'

  return (
    <div className="min-h-screen bg-[#F5F3EF] flex overflow-x-hidden">
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
        "flex-1 flex flex-col min-w-0 pt-24 transition-all duration-300 ease-linear",
        isSidebarCollapsed ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
      )}>
        <main className="space-y-8 p-8 w-full max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            <span>Lince</span>
            <ArrowRight size={12} className="text-slate-300" />
            <span className="text-slate-900">Novo Projeto</span>
          </nav>
          
          {/* Stepper */}
          <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100/50">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center flex-1 relative">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all z-10 font-semibold",
                  currentStep === step.id ? "bg-[#708D7A] border-[#708D7A] text-white shadow-md shadow-[#708D7A]/20" :
                  currentStep > step.id ? "bg-emerald-50 border-emerald-50 text-emerald-600" : "bg-white border-slate-200 text-slate-400"
                )}>
                  {currentStep > step.id ? <CheckCircle2 className="h-6 w-6" /> : step.id}
                </div>
                <span className={cn("text-[10px] uppercase font-bold mt-2 tracking-wider", currentStep >= step.id ? "text-slate-900" : "text-slate-400")}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-[24px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-0 overflow-hidden">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Nome do Projeto</Label>
                    <Input value={formData.nomeProjeto} onChange={(e) => updateFormData('nomeProjeto', e.target.value)} className="h-12 border-slate-200 focus-visible:ring-slate-300 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Número do Convênio</Label>
                    <Input value={formData.numeroConvenio} onChange={(e) => updateFormData('numeroConvenio', e.target.value)} className="h-12 border-slate-200 focus-visible:ring-slate-300 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Área</Label>
                  <Select onValueChange={(v) => updateFormData('area', v)}>
                    <SelectTrigger className="h-12 border-slate-200 focus-visible:ring-slate-300 rounded-xl"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 rounded-xl">{areas.map(a => <SelectItem key={a} value={a} className="cursor-pointer">{a}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Responsável</Label>
                    <Input value={formData.nomeResponsavel} onChange={(e) => updateFormData('nomeResponsavel', e.target.value)} className="h-12 border-slate-200 focus-visible:ring-slate-300 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-bold text-xs uppercase ml-1">CPF/CNPJ</Label>
                    <Input value={formData.cpfCnpj} onChange={(e) => updateFormData('cpfCnpj', formatCPFCNPJ(e.target.value))} className="h-12 border-slate-200 focus-visible:ring-slate-300 rounded-xl" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Valor Total</Label>
                    <Input value={formData.valorTotal} onChange={(e) => updateFormData('valorTotal', formatCurrency(e.target.value))} className="h-12 border-slate-200 focus-visible:ring-slate-300 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Parcelas</Label>
                    <Input type="number" value={formData.numeroParcelas} onChange={(e) => updateFormData('numeroParcelas', e.target.value)} className="h-12 border-slate-200 focus-visible:ring-slate-300 rounded-xl" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 text-center">
                <div className="rounded-[22px] border-2 border-dashed border-slate-200 bg-slate-50/80 px-6 py-16 text-center cursor-pointer hover:bg-slate-50 transition-all group">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-[#708D7A] shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    <Upload className="h-10 w-10" />
                  </div>
                  <p className="text-lg font-bold text-slate-900">Arraste os documentos do projeto</p>
                  <p className="mt-2 text-sm text-slate-400 font-medium">Contratos, termos aditivos e outros anexos.</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)} disabled={currentStep === 1} className="text-slate-500 hover:text-slate-900 cursor-pointer">Voltar</Button>
            <Button 
              className="bg-[#708D7A] hover:bg-[#708D7A]/90 text-white font-semibold px-10 rounded-xl h-12 cursor-pointer shadow-sm"
              onClick={() => currentStep === 4 ? handleSubmit() : setCurrentStep(prev => prev + 1)}
            >
              {isSubmitting ? 'Processando...' : currentStep === 4 ? 'Finalizar' : 'Continuar'}
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}