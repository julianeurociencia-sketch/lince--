'use client'

import { useState } from 'react'
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
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen w-full bg-[#f0f7ff] flex flex-col items-center justify-center p-4 py-12">
      
      {/* Container Principal (Cartão) */}
      <div className="w-full max-w-[650px] bg-white rounded-[32px] shadow-xl shadow-blue-100/50 p-10 space-y-8">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-2">
          <h1 className="text-[#1e3a8a] text-3xl font-black tracking-tight">Criar conta</h1>
          <p className="text-blue-500/70 font-medium">Preencha seus dados para se cadastrar</p>
        </div>

        <form className="space-y-6">
          
          {/* Nome Completo */}
          <div className="space-y-2">
            <Label className="text-[#1e3a8a] font-bold text-xs uppercase ml-1">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
              <Input 
                placeholder="Seu nome completo" 
                className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-[#1e3a8a] font-bold text-xs uppercase ml-1">Email</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
              <Input 
                type="email"
                placeholder="seu@email.com" 
                className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* CPF/CNPJ e Contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#1e3a8a] font-bold text-xs uppercase ml-1">CPF ou CNPJ</Label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <Input placeholder="000.000.000-00" className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#1e3a8a] font-bold text-xs uppercase ml-1">Contato</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <Input placeholder="(00) 00000-0000" className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl" />
              </div>
            </div>
          </div>

          {/* Instituição */}
          <div className="space-y-2">
            <Label className="text-[#1e3a8a] font-bold text-xs uppercase ml-1">Instituição</Label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
              <Input placeholder="Nome da instituição" className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl" />
            </div>
          </div>

          {/* Nome do Projeto */}
          <div className="space-y-2">
            <Label className="text-[#1e3a8a] font-bold text-xs uppercase ml-1">Nome do Projeto</Label>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
              <Input placeholder="Nome do projeto" className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl" />
            </div>
          </div>

          {/* Código do Projeto */}
          <div className="space-y-2">
            <Label className="text-[#1e3a8a] font-bold text-xs uppercase ml-1">Código do Projeto</Label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
              <Input placeholder="Ex: PROJ-2024-001" className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl" />
            </div>
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#1e3a8a] font-bold text-xs uppercase ml-1">Data de Início</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <Input type="date" className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#1e3a8a] font-bold text-xs uppercase ml-1">Data de Término</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <Input type="date" className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl" />
              </div>
            </div>
          </div>

          {/* Senhas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#1e3a8a] font-bold text-xs uppercase ml-1">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="********" 
                  className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#1e3a8a] font-bold text-xs uppercase ml-1">Confirmar senha</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <Input type="password" placeholder="********" className="pl-12 h-14 bg-slate-100/50 border-none rounded-2xl" />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-4 pt-4">
            <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-200">
              Criar conta
            </Button>
            
            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-blue-100"></span>
              </div>
              <span className="relative bg-white px-4 text-sm text-blue-400 font-medium italic">Já tem uma conta?</span>
            </div>

            <Link href="/login" className="block">
              <Button variant="outline" className="w-full h-14 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-2xl font-bold text-lg flex gap-2">
                Voltar para o login
              </Button>
            </Link>
          </div>
        </form>
      </div>

      {/* Rodapé */}
      <footer className="mt-8 text-blue-900/40 text-xs font-bold uppercase tracking-[0.3em]">
        Lince - A visão que antecipa falhas
      </footer>
    </div>
  )
}