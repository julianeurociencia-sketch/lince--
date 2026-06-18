'use client'

import {
  FileUp,
  FilePlus,
  BarChart3,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  BookOpen,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'

const menuItems = [
  { icon: LayoutDashboard, label: 'Visao Geral', href: '/dashboard' },
  { icon: FileUp, label: 'Upload de Notas', href: '/upload-notas' },
  { icon: FilePlus, label: 'Plano de Trabalho', href: '/plano-trabalho' },
  { icon: BookOpen, label: 'Manual de Gestao', href: '/manual' },
  { icon: BarChart3, label: 'Monitoramento', href: '/organizacao' },
  { icon: AlertTriangle, label: 'Divergencias', href: '/divergencias' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === 'collapsed'

  const handleToggle = () => {
    toggleSidebar()
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 flex h-screen flex-col bg-[#1F2937] text-white shadow-xl transition-all duration-300',
        isCollapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      <div className="flex items-center justify-between p-6">
        {!isCollapsed && (
          <span className="flex items-center gap-2 text-2xl font-black tracking-tighter">
            <span className="bg-gradient-to-br from-[#708D7A] to-[#8FA798] bg-clip-text text-transparent">LINCE</span>
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="ml-auto text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <nav className="mt-4 flex-1 space-y-2 px-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-[#708D7A] text-white shadow-md shadow-[#708D7A]/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              )}
            >
              <item.icon
                size={20}
                className={cn('shrink-0', isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300')}
              />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}

              {isCollapsed && (
                <div className="pointer-events-none absolute left-full ml-4 whitespace-nowrap rounded bg-blue-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 z-[60]">
                  {item.label}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-1 border-t border-blue-800 p-4">
        <button className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-blue-100 transition-colors hover:bg-blue-800">
          <Settings size={22} className="shrink-0 text-blue-300 group-hover:text-white" />
          {!isCollapsed && <span className="font-medium">Configuracoes</span>}
        </button>
        <button className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-red-300 transition-colors hover:bg-red-900/30">
          <LogOut size={22} className="shrink-0 group-hover:text-red-400" />
          {!isCollapsed && <span className="font-medium">Sair</span>}
        </button>
      </div>
    </aside>
  )
}
