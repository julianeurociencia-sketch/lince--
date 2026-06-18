'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  User, 
  Mail, 
  FileText, 
  Phone, 
  Building2, 
  Hash, 
  Calendar, 
  Lock, 
  Eye, 
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  validateEmail,
  validatePassword,
  validateCPF,
  maskCPF,
  validatePhone,
  maskPhone,
  getPasswordStrength
} from '@/lib/validations'

type CadastroFormData = {
  fullName: string
  email: string
  cpf: string
  phone: string
  institution: string
  projectName: string
  projectCode: string
  startDate: string
  endDate: string
  password: string
  confirmPassword: string
}

type CadastroFormErrors = Partial<Record<keyof CadastroFormData | 'form', string>>

export default function CadastroPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<CadastroFormData>({
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    institution: '',
    projectName: '',
    projectCode: '',
    startDate: '',
    endDate: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<CadastroFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleCPFChange = (value: string) => {
    const masked = maskCPF(value)
    setFormData({ ...formData, cpf: masked })
  }

  const handlePhoneChange = (value: string) => {
    const masked = maskPhone(value)
    setFormData({ ...formData, phone: masked })
  }

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value })
  }

  const validateForm = () => {
    const newErrors: CadastroFormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório'
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido (deve ter 11 dígitos válidos)'
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido (deve ter 10 ou 11 dígitos)'
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'Instituição é obrigatória'
    }

    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Nome do projeto é obrigatório'
    }

    if (!formData.projectCode.trim()) {
      newErrors.projectCode = 'Código do projeto é obrigatório'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Data de início é obrigatória'
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Data de término é obrigatória'
    }

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors.join('. ')
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem'
    }

    return newErrors
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        cpf: formData.cpf,
        phone: formData.phone,
        institution: formData.institution,
        projectName: formData.projectName,
        projectCode: formData.projectCode,
        startDate: formData.startDate,
        endDate: formData.endDate
      }

      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')

      await new Promise(resolve => setTimeout(resolve, 1500))

      router.push('/dashboard')
    } catch {
      setErrors({ form: 'Erro ao criar conta. Tente novamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 border border-slate-200/60">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-950">Criar conta</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">Registre-se para acessar o sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Nome completo *</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input 
                  placeholder="Seu nome completo" 
                  className="pl-12 h-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white transition-all"
                  value={formData.fullName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-500 font-medium mt-1"><AlertCircle className="inline mr-1" size={14} /> {errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Email *</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input 
                  type="email"
                  placeholder="seu@email.com" 
                  className="pl-12 h-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white transition-all"
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-medium mt-1"><AlertCircle className="inline mr-1" size={14} /> {errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">CPF *</Label>
              <div className="relative group">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input 
                  placeholder="000.000.000-00" 
                  className="pl-12 h-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white transition-all"
                  value={formData.cpf}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleCPFChange(e.target.value)}
                  maxLength={14}
                />
              </div>
              {errors.cpf && <p className="text-xs text-red-500 font-medium mt-1"><AlertCircle className="inline mr-1" size={14} /> {errors.cpf}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Telefone *</Label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input 
                  placeholder="(00) 00000-0000" 
                  className="pl-12 h-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white transition-all"
                  value={formData.phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handlePhoneChange(e.target.value)}
                  maxLength={15}
                />
              </div>
              {errors.phone && <p className="text-xs text-red-500 font-medium mt-1"><AlertCircle className="inline mr-1" size={14} /> {errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Instituição *</Label>
            <div className="relative group">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
              <Input 
                placeholder="Nome da instituição" 
                className="pl-12 h-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white transition-all"
                value={formData.institution}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, institution: e.target.value })}
              />
            </div>
            {errors.institution && <p className="text-xs text-red-500 font-medium mt-1"><AlertCircle className="inline mr-1" size={14} /> {errors.institution}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Nome do Projeto *</Label>
              <div className="relative group">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input 
                  placeholder="Nome do projeto" 
                  className="pl-12 h-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white transition-all"
                  value={formData.projectName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, projectName: e.target.value })}
                />
              </div>
              {errors.projectName && <p className="text-xs text-red-500 font-medium mt-1"><AlertCircle className="inline mr-1" size={14} /> {errors.projectName}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Código do Projeto *</Label>
              <div className="relative group">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input 
                  placeholder="Ex: PROJ-2024-001" 
                  className="pl-12 h-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white transition-all"
                  value={formData.projectCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, projectCode: e.target.value })}
                />
              </div>
              {errors.projectCode && <p className="text-xs text-red-500 font-medium mt-1"><AlertCircle className="inline mr-1" size={14} /> {errors.projectCode}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Data de Início *</Label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input 
                  type="date" 
                  className="pl-12 h-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white transition-all"
                  value={formData.startDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              {errors.startDate && <p className="text-xs text-red-500 font-medium mt-1"><AlertCircle className="inline mr-1" size={14} /> {errors.startDate}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Data de Término *</Label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input 
                  type="date" 
                  className="pl-12 h-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white transition-all"
                  value={formData.endDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              {errors.endDate && <p className="text-xs text-red-500 font-medium mt-1"><AlertCircle className="inline mr-1" size={14} /> {errors.endDate}</p>}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Senha *</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Crie uma senha forte" 
                  className="pl-12 pr-10 h-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white transition-all"
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handlePasswordChange(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.password && (
                <div className="space-y-2 mt-3 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
                  <div className={`text-xs font-semibold ${passwordStrength?.color}`}>{passwordStrength?.text}</div>
                  <div className="space-y-1.5">
                    <div className={`text-xs flex items-center gap-2 ${formData.password.length >= 6 ? 'text-green-600' : 'text-slate-400'}`}>
                      {formData.password.length >= 6 ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      <span>Mínimo de 6 caracteres</span>
                    </div>
                    <div className={`text-xs flex items-center gap-2 ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                      {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      <span>Pelo menos 1 caractere especial</span>
                    </div>
                    <div className={`text-xs flex items-center gap-2 ${(formData.password.match(/\d/g) || []).length >= 2 ? 'text-green-600' : 'text-slate-400'}`}>
                      {(formData.password.match(/\d/g) || []).length >= 2 ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      <span>Pelo menos 2 números</span>
                    </div>
                  </div>
                </div>
              )}
              {errors.password && <p className="text-xs text-red-500 font-medium mt-1"><AlertCircle className="inline mr-1" size={14} /> {errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Confirmar Senha *</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirme sua senha" 
                  className="pl-12 pr-10 h-12 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white transition-all"
                  value={formData.confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 font-medium mt-1"><AlertCircle className="inline mr-1" size={14} /> {errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#708D7A] to-[#6B8571] hover:from-[#6B8571] hover:to-[#647F68] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Criando conta...
                </>
              ) : (
                'Criar conta'
              )}
            </Button>
            
            <div className="relative flex items-center">
              <div className="flex-1 border-t border-slate-200" />
              <span className="px-3 text-xs text-slate-400 font-medium">Já tem uma conta?</span>
              <div className="flex-1 border-t border-slate-200" />
            </div>

            <Link href="/" className="block">
              <Button 
                type="button"
                className="w-full h-12 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold transition-all duration-200 cursor-pointer hover:border-[#708D7A] hover:text-[#708D7A] bg-white"
              >
                Voltar para o login
              </Button>
            </Link>
          </div>
        </form>
      </div>

      <footer className="mt-12 text-slate-400 text-xs font-bold uppercase tracking-[0.15em]">
        Lince • Gestão Inteligente
      </footer>
    </div>
  )
}
