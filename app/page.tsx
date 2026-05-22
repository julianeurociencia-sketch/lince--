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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card de Login */}
        <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100/80 rounded-2xl shadow-xl border border-blue-100/50 p-8 space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <LinceLogo size="lg" />
          </div>

          {/* Título */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-slate-800">Bem-vindo</h1>
            <p className="text-slate-500 text-sm">
              Gestão de documentos enviados à Petrobras
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10 bg-gray-100 border-gray-200 text-black placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className="pl-10 pr-10 bg-gray-100 border-gray-200 text-black placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 h-11"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <Link
                href="/esqueci-senha"
                className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
              >
                Esqueci minha senha
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-medium shadow-md"
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
              <div className="w-full border-t border-blue-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100/80 px-3 text-slate-400">
                Novo por aqui?
              </span>
            </div>
          </div>

          {/* Botão Criar Conta */}
          <Link href="/cadastro" className="block">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-medium shadow-md"
            >
              Criar uma conta
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6 font-medium">
          Lince - A visão que antecipa falhas
        </p>
      </motion.div>
    </div>
  )
}