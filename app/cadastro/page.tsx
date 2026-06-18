'use client'

import { useState } from 'react'
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
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  validateEmail,
  validatePassword,
  validateCPF,
  validatePhone,
  formatCPF,
  formatPhone,
  maskCPF,
  maskPhone,
  validateRequired
} from '@/lib/validations'

export default function RegistroPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validação de Nome Completo
    if (!validateRequired(formData.fullName)) {
      newErrors.fullName = 'Nome completo é obrigatório'
    }

    // Validação de Email
    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email é obrigatório'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Validação de CPF
    if (!validateRequired(formData.cpf)) {
      newErrors.cpf = 'CPF é obrigatório'
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido'
    }

    // Validação de Telefone
    if (!validateRequired(formData.phone)) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone deve conter 10 ou 11 dígitos'
    }

    // Validação de Instituição
    if (!validateRequired(formData.institution)) {
      newErrors.institution = 'Instituição é obrigatória'
    }

    // Validação de Nome do Projeto
    if (!validateRequired(formData.projectName)) {
      newErrors.projectName = 'Nome do projeto é obrigatório'
    }

    // Validação de Código do Projeto
    if (!validateRequired(formData.projectCode)) {
      newErrors.projectCode = 'Código do projeto é obrigatório'
    }

    // Validação de Data de Início
    if (!validateRequired(formData.startDate)) {
      newErrors.startDate = 'Data de início é obrigatória'
    }

    // Validação de Data de Término
    if (!validateRequired(formData.endDate)) {
      newErrors.endDate = 'Data de término é obrigatória'
    }

    // Validação de Senha
    if (!validateRequired(formData.password)) {
      newErrors.password = 'Senha é obrigatória'
    } else {
      const passwordValidation = validatePassword(formData.password)
      if (!passwordValidation.isValid) {
        newErrors.password = 'Senha não atende aos requisitos'
        setPasswordErrors(passwordValidation.errors)
      }
    }

    // Validação de Confirmação de Senha
    if (!validateRequired(formData.confirmPassword)) {
      newErrors.confirmPassword = 'Confirme sua senha'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value })
    if (value) {
      const validation = validatePassword(value)
      setPasswordErrors(validation.errors)
    } else {
      setPasswordErrors([])
    }
  }

  const handleCPFChange = (value: string) => {
    const maskedCPF = maskCPF(value)
    setFormData({ ...formData, cpf: maskedCPF })
  }

  const handlePhoneChange = (value: string) => {
    const maskedPhone = maskPhone(value)
    setFormData({ ...formData, phone: maskedPhone })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Salvar dados do usuário
    localStorage.setItem('lince_token', 'mock_jwt_token_' + Date.now())
    localStorage.setItem('lince_user', JSON.stringify({
      id: '1',
      name: formData.fullName,
      email: formData.email,
      cpf: formData.cpf,
      phone: formData.phone,
      institution: formData.institution,
      role: 'user'
    }))

    router.push('/dashboard')
  }

  const getPasswordStrength = () => {
    if (!formData.password) return null
    const validation = validatePassword(formData.password)
    if (validation.isValid) {
      return { text: 'Senha forte', color: 'text-green-600' }
    }
    if (validation.errors.length === 1) {
      return { text: 'Senha média', color: 'text-yellow-600' }
    }
    return { text: 'Senha fraca', color: 'text-red-600' }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="min-h-screen w-full bg-[#F5F3EF] flex flex-col items-center justify-center p-4 py-12">
      
      {/* Container Principal (Cartão) */}
      <div className="w-full max-w-[650px] bg-white rounded-[32px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-10 space-y-8 border border-slate-100">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-2">
          <h1 className="text-slate-950 text-3xl font-black tracking-tight">Criar conta</h1>
          <p className="text-slate-500 font-medium">Preencha seus dados para se cadastrar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Nome Completo */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Nome completo *</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Seu nome completo" 
                className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all text-black"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            {errors.fullName && (
              <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                <AlertCircle size={16} /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                type="email"
                placeholder="seu@email.com" 
                className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all text-black"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                <AlertCircle size={16} /> {errors.email}
              </p>
            )}
          </div>

          {/* CPF/CNPJ e Contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase ml-1">CPF *</Label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="000.000.000-00" 
                  className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all text-black"
                  value={formData.cpf}
                  onChange={(e) => handleCPFChange(e.target.value)}
                  maxLength="14"
                />
              </div>
              {errors.cpf && (
                <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.cpf}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Telefone *</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="(00) 00000-0000" 
                  className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all text-black"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  maxLength="15"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Instituição */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Instituição *</Label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Nome da instituição" 
                className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all text-black"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              />
            </div>
            {errors.institution && (
              <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                <AlertCircle size={16} /> {errors.institution}
              </p>
            )}
          </div>

          {/* Nome do Projeto */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Nome do Projeto *</Label>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Nome do projeto" 
                className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all text-black"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              />
            </div>
            {errors.projectName && (
              <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                <AlertCircle size={16} /> {errors.projectName}
              </p>
            )}
          </div>

          {/* Código do Projeto */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Código do Projeto *</Label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Ex: PROJ-2024-001" 
                className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all text-black"
                value={formData.projectCode}
                onChange={(e) => setFormData({ ...formData, projectCode: e.target.value })}
              />
            </div>
            {errors.projectCode && (
              <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                <AlertCircle size={16} /> {errors.projectCode}
              </p>
            )}
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Data de Início *</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  type="date" 
                  className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all text-black"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              {errors.startDate && (
                <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.startDate}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Data de Término *</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  type="date" 
                  className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all text-black"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              {errors.endDate && (
                <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.endDate}
                </p>
              )}
            </div>
          </div>

          {/* Senhas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Senha *</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Criar uma senha forte" 
                  className="pl-12 pr-10 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all text-black"
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Requisitos de Senha */}
              {formData.password && (
                <div className="space-y-2 mt-3 p-3 bg-slate-50 rounded-lg">
                  <div className={`text-xs font-semibold ${passwordStrength?.color}`}>
                    {passwordStrength?.text}
                  </div>
                  <div className="space-y-1">
                    <div className={`text-xs flex items-center gap-2 ${formData.password.length >= 6 ? 'text-green-600' : 'text-slate-400'}`}>
                      {formData.password.length >= 6 ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      Mínimo de 6 caracteres
                    </div>
                    <div className={`text-xs flex items-center gap-2 ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                      {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      Pelo menos 1 caractere especial
                    </div>
                    <div className={`text-xs flex items-center gap-2 ${(formData.password.match(/\d/g) || []).length >= 2 ? 'text-green-600' : 'text-slate-400'}`}>
                      {(formData.password.match(/\d/g) || []).length >= 2 ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      Pelo menos 2 números
                    </div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.password}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Confirmar Senha *</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirme sua senha" 
                  className="pl-12 pr-10 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all text-black"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-4 pt-4">
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-[#708D7A] hover:bg-[#708D7A]/90 text-white rounded-2xl font-bold text-lg shadow-md cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
            
            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
              <span className="relative bg-white px-4 text-sm text-slate-400 font-medium italic">Já tem uma conta?</span>
            </div>

            <Link href="/" className="block">
              <Button 
                type="button"
                variant="outline" 
                className="w-full h-14 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl font-bold text-lg cursor-pointer bg-white"
              >
                Voltar para o login
              </Button>
            </Link>
          </div>
        </form>
      </div>

      {/* Rodapé */}
      <footer className="mt-8 text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
        Lince - A visão que antecipa falhas
      </footer>
    </div>
  )
}