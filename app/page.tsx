'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import { LinceLogo } from '@/components/lince-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    localStorage.setItem('lince_token', 'mock_jwt_token_' + Date.now())
    localStorage.setItem('lince_user', JSON.stringify({
      id: '1',
      name: 'Carlos Alberto Santos',
      email: formData.email,
      role: 'auditor'
    }))
    
    router.push('/dashboard')
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(112,141,122,0.08),transparent_28%),radial-gradient(circle_at_70%_18%,rgba(112,141,122,0.06),transparent_22%),radial-gradient(circle_at_50%_75%,rgba(112,141,122,0.04),transparent_34%)] blur-3xl pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card Principal */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-2xl backdrop-blur-sm p-8 md:p-10 space-y-8">
          
          {/* Logo e Título */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <LinceLogo size="lg" />
            </motion.div>
            
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-black text-slate-950">Bem-vindo</h1>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Gestão inteligente de documentos e conformidade
              </p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-12 h-12 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white rounded-xl transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-medium mt-1.5">{errors.email}</p>
              )}
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Senha</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className="pl-12 pr-12 h-12 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#708D7A]/50 focus-visible:border-[#708D7A] focus-visible:bg-white rounded-xl transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-medium mt-1.5">{errors.password}</p>
              )}
            </div>

            {/* Link Esqueci Senha */}
            <div className="flex justify-end">
              <Link
                href="/esqueci-senha"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Esqueci minha senha
              </Link>
            </div>

            {/* Botão Entrar */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#708D7A] to-[#6B8571] hover:from-[#6B8571] hover:to-[#647F68] text-white h-12 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Autenticando...
                </>
              ) : (
                'Entrar no Sistema'
              )}
            </Button>
          </form>

          {/* Divisor */}
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-slate-200" />
            <span className="px-3 text-xs text-slate-400 font-medium">Novo aqui?</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* Botão Criar Conta */}
          <Link href="/cadastro">
            <Button
              className="w-full border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 h-12 font-bold rounded-xl transition-all duration-200 cursor-pointer hover:border-[#708D7A] hover:text-[#708D7A]"
            >
              Criar uma conta
            </Button>
          </Link>
        </div>

        {/* Rodapé */}
        <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mt-10">
          Lince • Gestão Inteligente
        </p>
      </motion.div>
    </div>
  )
}