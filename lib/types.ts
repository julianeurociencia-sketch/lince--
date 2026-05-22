// Tipos principais do sistema Lince


export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'auditor' | 'gestor'
  avatar?: string
}

export interface Project {
  id: string
  name: string
  convenio: string
  institution: string
  responsible: string
  cpfCnpj: string
  startDate: string
  endDate: string
  totalValue: number
  parcels: number
  area: string
  status: 'em_analise' | 'aprovado' | 'com_divergencias' | 'finalizado'
  complianceScore: number
  createdAt: string
  updatedAt: string
}

export interface Document {
  id: string
  projectId: string
  name: string
  type: 'plano_trabalho' | 'nota_fiscal' | 'comprovante' | 'contrato' | 'relatorio' | 'orcamento' | 'relatorio_tecnico' | 'recibo'
  category?: string
  status: 'pendente' | 'analisado' | 'com_divergencia' | 'aprovado'
  uploadedAt: string
  fileUrl?: string
  fileType: string
  size: number
  extractedData?: ExtractedData
}

export interface ExtractedData {
  cnpj?: string
  value?: number
  date?: string
  description?: string
  supplier?: string
  category?: string
  items?: string[]
}

export interface Divergence {
  id: string
  projectId: string
  documentId: string
  type: 'valor_excedido' | 'categoria_invalida' | 'data_fora_vigencia' | 'fornecedor_restrito' | 'documento_ausente' | 'duplicidade' | 'rubrica_excedida'
  severity: 'baixa' | 'media' | 'alta' | 'critica'
  status: 'pendente' | 'em_analise' | 'resolvida' | 'justificada'
  description: string
  affectedValue: number
  parcel: number
  planoTrabalhoRef?: string
  manualGestaoRef?: string
  recommendation?: string
  createdAt: string
  resolvedAt?: string
}

export interface FinancialCategory {
  id: string
  name: string
  approvedValue: number
  usedValue: number
  documents: Document[]
  status: 'dentro_limite' | 'proximo_limite' | 'excedido'
}

export interface PlanoTrabalhoItem {
  id: string
  code: string
  name: string
  description: string
  approvedValue: number
  usedValue: number
  subcategories?: PlanoTrabalhoItem[]
}

export interface ManualGestaoRule {
  id: string
  article: string
  title: string
  description: string
  type: 'obrigatorio' | 'proibido' | 'recomendado'
  category: string
}

export interface AuditReport {
  id: string
  projectId: string
  generatedAt: string
  complianceScore: number
  adherencePercentage: number
  criticalIssues: number
  missingDocuments: number
  suspiciousExpenses: number
  totalAnalyzed: number
  totalWithDivergences: number
  recommendations: string[]
}

export interface DashboardStats {
  totalProjects: number
  projectsWithDivergences: number
  analyzedParcels: number
  auditedValue: number
  inconsistentValue: number
  complianceRate: number
}

export interface ChartData {
  name: string
  value: number
  fill?: string
}

export interface TimelineData {
  month: string
  planejado: number
  executado: number
  divergencias: number
}