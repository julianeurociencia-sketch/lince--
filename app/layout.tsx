import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { SidebarProvider } from '@/components/ui/sidebar' // <-- Importação do Provider adicionada
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'Lince | Auditoria Inteligente',
  description: 'Plataforma de auditoria inteligente e prestação de contas automatizada para projetos financiados',
  generator: 'Lince by v0',
  keywords: ['auditoria', 'compliance', 'prestação de contas', 'gestão financeira', 'petrobras'],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${geistMono.variable} dark`}>
      <body className="font-sans antialiased bg-background">
        {/* Envolvendo a aplicação inteira com o SidebarProvider */}
        <SidebarProvider>
          {children}
        </SidebarProvider>
        
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}