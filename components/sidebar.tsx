'use client'

import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  AlertTriangle, 
  FolderTree, 
  ClipboardCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { useState, useEffect } from 'react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Meus Documentos', href: '/documentos' },
  { icon: Search, label: 'Análises', href: '/analises' }, // Verifique se a pasta é 'analises' ou 'analise'
  { icon: AlertTriangle, label: 'Divergências', href: '/divergencias' }, // Aponta para a pasta /divergencias
  { icon: FolderTree, label: 'Organização', href: '/organizacao' },
  { icon: ClipboardCheck, label: 'Prestação de Contas', href: '/auditoria' }, // Aponta para a pasta /auditoria
]

export function Sidebar() {
  const pathname = usePathname()
  const sidebarContext = useSidebar()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    // Verificar localStorage para manter o estado persistido
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved))
    }
  }, [])

  const handleToggle = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newState))
  }

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-blue-900 text-white transition-all duration-300 z-50 flex flex-col shadow-2xl",
        isCollapsed ? "w-[72px]" : "w-[260px]"
      )}
      data-sidebar-state={isCollapsed ? 'collapsed' : 'expanded'}
    >
      {/* Logo Area */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <span className="text-2xl font-black tracking-tighter flex items-center gap-2">
            LINCE
          </span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleToggle}
          className="text-white hover:bg-blue-800 ml-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              )}
            >
              <item.icon size={22} className={cn("shrink-0", isActive ? "text-white" : "text-blue-300 group-hover:text-white")} />
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