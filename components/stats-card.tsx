import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: { value: number; isPositive: boolean }
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'accent'
  className?: string
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  description,
  trend, 
  variant = 'default', 
  className 
}: StatsCardProps) {
  
  const variantColors = {
    default: 'text-blue-600 bg-blue-50',
    success: 'text-emerald-600 bg-emerald-50',
    warning: 'text-amber-600 bg-amber-50',
    destructive: 'text-red-600 bg-red-50',
    accent: 'text-cyan-600 bg-cyan-50',
  }

  return (
    <Card className={cn("bg-white border-blue-100 shadow-sm overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", variantColors[variant])}>
          {/* Se o erro continuar, o problema está no arquivo da página (item 1 acima) */}
          {Icon && <Icon className="h-4 w-4" />}
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="text-2xl font-bold text-blue-900 tracking-tight">
          {value}
        </div>
        {description && (
          <div className="text-sm text-slate-500 mt-1">
            {description}
          </div>
        )}
        
        {trend && (
          <div className={cn(
            "text-[11px] mt-1.5 font-semibold flex items-center gap-1",
            trend.isPositive ? "text-emerald-600" : "text-red-500"
          )}>
            <span>{trend.isPositive ? "+" : "-"}{trend.value}%</span>
            <span className="text-slate-400 font-normal">vs mês anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}