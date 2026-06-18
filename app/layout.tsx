import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Raleway } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { SidebarProvider } from '@/components/ui/sidebar'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800']
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800', '900']
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: '--font-raleway',
  weight: ['400', '500', '600', '700', '800']
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
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable} ${raleway.variable} dark`}>
      <body className="font-sans antialiased bg-background">
        <SidebarProvider>
          {children}
        </SidebarProvider>
        
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}