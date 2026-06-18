'use client'

import { 
  Search, 
  FileUp,
  FilePlus,
  BarChart3,
  LayoutDashboard,
  FolderTree,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  BookOpen,
  UserPlus,
  LogIn
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'

const menuItems = [
  { icon: LogIn, label: 'Login', href: '/' },
  { icon: UserPlus, label: 'Cadastro', href: '/cadastro' },
  { icon: LayoutDashboard, label: 'Visão Geral', href: '/dashboard' },
  { icon: FileUp, label: 'Upload de Notas', href: '/upload-notas' },
  { icon: FilePlus, label: 'Plano de Trabalho', href: '/plano-trabalho' },
  { icon: BookOpen, label: 'Manual de Gestão', href: '/manual' },
  { icon: BarChart3, label: 'Monitoramento', href: '/organizacao' },
  { icon: AlertTriangle, label: 'Divergências', href: '/divergencias' },
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
        "fixed left-0 top-0 h-screen bg-[#1F2937] text-white transition-all duration-300 z-50 flex flex-col shadow-xl",
        isCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo Area */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <span className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <span className="bg-gradient-to-br from-[#708D7A] to-[#8FA798] bg-clip-text text-transparent">LINCE</span>
          </span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleToggle}
          className="text-gray-400 hover:text-white hover:bg-gray-800 ml-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative text-sm font-medium",
                isActive 
                  ? "bg-[#708D7A] text-white shadow-md shadow-[#708D7A]/20" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <item.icon size={20} className={cn("shrink-0", isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300")} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
              
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-blue-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">
                  {item.label}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer Area */}
      <div className="p-4 border-t border-blue-800 space-y-1">
        <button className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-blue-100 hover:bg-blue-800 transition-colors group">
          <Settings size={22} className="shrink-0 text-blue-300 group-hover:text-white" />
          {!isCollapsed && <span className="font-medium">Configurações</span>}
        </button>
        <button className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-red-300 hover:bg-red-900/30 transition-colors group">
          <LogOut size={22} className="shrink-0 group-hover:text-red-400" />
          {!isCollapsed && <span className="font-medium">Sair</span>}
        </button>
      </div>
    </aside>
  )
}