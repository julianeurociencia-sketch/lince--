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
    default: 'text-slate-500 bg-slate-50 ring-1 ring-slate-100',
    success: 'text-emerald-600 bg-emerald-50 ring-1 ring-[#10B981]/10',
    warning: 'text-amber-600 bg-amber-50 ring-1 ring-amber-100',
    destructive: 'text-rose-600 bg-rose-50 ring-1 ring-rose-100',
    accent: 'text-cyan-600 bg-cyan-50 ring-1 ring-cyan-100',
  }

  return (
    <div className={cn("rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-sm flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {title}
        </p>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl", variantColors[variant])}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>
      
      <div className="mt-5">
        <p className="text-3xl font-semibold tracking-tight text-slate-900">
          {value}
        </p>
        
        {description && (
          <p className="text-xs text-slate-400 mt-2 font-medium">
            {description}
          </p>
        )}
        
        {trend && (
          <div className={cn(
            "text-xs mt-2 font-bold flex items-center gap-1",
            trend.isPositive ? "text-emerald-600" : "text-rose-600"
          )}>
            <span>{trend.isPositive ? "+" : "-"}{trend.value}%</span>
            <span className="text-slate-400 font-normal">vs mês anterior</span>
          </div>
        )}
      </div>
    </div>
  )
}