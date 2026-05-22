'use client'

import Image from 'next/image'

interface LinceLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'dark'
  className?: string
}

export function LinceLogo({ size = 'md', variant = 'dark', className = '' }: LinceLogoProps) {
  const sizes = {
    sm: { width: 120, height: 48 },
    md: { width: 160, height: 64 },
    lg: { width: 220, height: 88 },
    xl: { width: 280, height: 112 }
  }

  return (
    <Image
      src="/images/lince-logo.png"
      alt="Lince - Auditoria Inteligente"
      width={sizes[size].width}
      height={sizes[size].height}
      className={`object-contain ${variant === 'light' ? 'brightness-0 invert' : ''} ${className}`}
      priority
    />
  )
}
