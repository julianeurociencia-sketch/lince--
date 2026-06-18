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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F5F3EF] p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.75),transparent_28%),radial-gradient(circle_at_70%_18%,rgba(255,255,255,0.55),transparent_22%),radial-gradient(circle_at_50%_75%,rgba(245,243,239,0.95),transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(112,141,122,0.08),transparent_0_22%),radial-gradient(circle_at_75%_65%,rgba(112,141,122,0.06),transparent_0_18%)] blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card de Login */}
        <div className="rounded-[28px] border border-slate-200/55 bg-white/75 p-8 space-y-8 shadow-[0_18px_50px_rgba(0,0,0,0.04)] backdrop-blur-md">
          {/* Logo */}
          <div className="flex justify-center">
            <LinceLogo size="lg" />
          </div>

          {/* Título */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-950">Bem-vindo</h1>
            <p className="text-slate-500 text-sm font-medium">
              Gestão de documentos enviados à Petrobras
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold text-xs uppercase ml-1">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10 bg-slate-50/50 border-slate-200 text-black placeholder:text-slate-400 focus-visible:ring-slate-200 h-11 rounded-xl focus-visible:bg-white transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 font-medium">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-semibold text-xs uppercase ml-1">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className="pl-10 pr-10 bg-slate-50/50 border-slate-200 text-black placeholder:text-slate-400 focus-visible:ring-slate-200 h-11 rounded-xl focus-visible:bg-white transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 font-medium">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <Link
                href="/esqueci-senha"
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Esqueci minha senha
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#708D7A] hover:bg-[#708D7A]/90 text-white h-11 font-semibold shadow-sm rounded-xl cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Divisor */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-medium italic rounded-md">
                Novo por aqui?
              </span>
            </div>
          </div>

          {/* Botão Criar Conta */}
          <Link href="/cadastro" className="block">
            <Button
              className="w-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 h-11 font-semibold shadow-sm rounded-xl cursor-pointer"
            >
              Criar uma conta
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mt-8">
          Lince - A visão que antecipa falhas
        </p>
      </motion.div>
    </div>
  )
}