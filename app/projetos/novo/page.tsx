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

  return (
    <div className="min-h-screen bg-blue-50/50 flex overflow-x-hidden">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        state === 'collapsed' ? "pl-[72px]" : "pl-[72px] lg:pl-[260px]"
      )}>
        <Header title="Cadastro de Projeto" subtitle="Manual de PD&I Petrobras" />
        
        <main className="p-6 max-w-5xl mx-auto w-full space-y-8">
          {/* Stepper Vertical/Horizontal */}
          <div className="flex justify-between items-center mb-10">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center flex-1 relative">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all z-10",
                  currentStep >= step.id ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-400"
                )}>
                  {currentStep > step.id ? <CheckCircle2 className="h-6 w-6" /> : step.id}
                </div>
                <span className={cn("text-[10px] uppercase font-bold mt-2", currentStep >= step.id ? "text-blue-600" : "text-slate-400")}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Nome do Projeto</Label>
                      <Input value={formData.nomeProjeto} onChange={(e) => updateFormData('nomeProjeto', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Número do Convênio</Label>
                      <Input value={formData.numeroConvenio} onChange={(e) => updateFormData('numeroConvenio', e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Área</Label>
                    <Select onValueChange={(v) => updateFormData('area', v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                      <SelectContent>{areas.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label>Responsável</Label><Input value={formData.nomeResponsavel} onChange={(e) => updateFormData('nomeResponsavel', e.target.value)} /></div>
                    <div className="space-y-2"><Label>CPF/CNPJ</Label><Input value={formData.cpfCnpj} onChange={(e) => updateFormData('cpfCnpj', formatCPFCNPJ(e.target.value))} /></div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Valor Total</Label>
                      <Input value={formData.valorTotal} onChange={(e) => updateFormData('valorTotal', formatCurrency(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Parcelas</Label>
                      <Input type="number" value={formData.numeroParcelas} onChange={(e) => updateFormData('numeroParcelas', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6 text-center">
                  <div className="border-2 border-dashed border-blue-200 rounded-3xl p-12 bg-blue-50/30">
                    <Upload className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                    <p className="text-blue-900 font-bold">Arraste os documentos do projeto</p>
                    <p className="text-blue-400 text-xs mt-1 italic">Plano de Trabalho, Contratos, etc.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between items-center pt-4">
            <Button variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)} disabled={currentStep === 1}>Voltar</Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 px-10 rounded-xl font-bold h-12"
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