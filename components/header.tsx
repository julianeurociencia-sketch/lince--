'use client'

import { Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    // Removi as classes fixas de bg e border para não dar conflito com a div pai da página
    <header className="h-16 flex items-center justify-between px-6">
      {/* Title */}
      <div>
        <h1 className="text-lg font-semibold text-white tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-blue-200/80">{subtitle}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
          <Input
            placeholder="Buscar projetos, documentos..."
            className="w-72 pl-9 bg-blue-800/50 border-blue-700/50 text-white placeholder:text-blue-300 focus-visible:ring-blue-400"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-blue-800">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-blue-400 text-blue-900 border-2 border-blue-900">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium text-sm">Ponto de atenção identificado</span>
              <span className="text-xs text-muted-foreground">Projeto CONV-2024-001 - há 5 minutos</span>
            </DropdownMenuItem>
            {/* ... itens de menu ... */}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-3 text-white hover:bg-blue-800 pl-2">
              <Avatar className="h-8 w-8 border border-blue-700">
                <AvatarFallback className="bg-blue-700 text-white text-xs">
                  CA
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-medium text-white">Carlos Alberto</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
