import { 
  Project, 
  Document, 
  Divergence, 
  DashboardStats, 
  PlanoTrabalhoItem, 
  ManualGestaoRule,
  AuditReport,
  ChartData,
  TimelineData
} from './types'

// Projetos mock
export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'Desenvolvimento de Tecnologia de Captura de CO2',
    convenio: 'CONV-2024-001',
    institution: 'Universidade Federal do Rio de Janeiro',
    responsible: 'Dr. Carlos Alberto Santos',
    cpfCnpj: '33.663.683/0001-16',
    startDate: '2024-01-15',
    endDate: '2026-01-14',
    totalValue: 4500000,
    parcels: 6,
    area: 'Pesquisa e Desenvolvimento',
    status: 'com_divergencias',
    complianceScore: 78,
    createdAt: '2024-01-10',
    updatedAt: '2024-03-15'
  },
  {
    id: 'proj-002',
    name: 'Otimização de Processos de Refino',
    convenio: 'CONV-2024-002',
    institution: 'Instituto de Tecnologia do Paraná',
    responsible: 'Dra. Maria Helena Costa',
    cpfCnpj: '76.012.998/0001-32',
    startDate: '2024-02-01',
    endDate: '2025-07-31',
    totalValue: 2800000,
    parcels: 4,
    area: 'Engenharia de Processos',
    status: 'aprovado',
    complianceScore: 95,
    createdAt: '2024-01-25',
    updatedAt: '2024-03-10'
  },
  {
    id: 'proj-003',
    name: 'Monitoramento Ambiental de Áreas Offshore',
    convenio: 'CONV-2024-003',
    institution: 'Fundação Oswaldo Cruz',
    responsible: 'Dr. João Pedro Lima',
    cpfCnpj: '33.781.055/0001-35',
    startDate: '2024-03-01',
    endDate: '2025-12-31',
    totalValue: 3200000,
    parcels: 5,
    area: 'Meio Ambiente',
    status: 'em_analise',
    complianceScore: 62,
    createdAt: '2024-02-20',
    updatedAt: '2024-03-18'
  },
  {
    id: 'proj-004',
    name: 'Inteligência Artificial para Manutenção Preditiva',
    convenio: 'CONV-2023-015',
    institution: 'Universidade de São Paulo',
    responsible: 'Dr. Ricardo Mendes',
    cpfCnpj: '63.025.530/0001-04',
    startDate: '2023-06-01',
    endDate: '2025-05-31',
    totalValue: 5100000,
    parcels: 8,
    area: 'Tecnologia da Informação',
    status: 'finalizado',
    complianceScore: 91,
    createdAt: '2023-05-15',
    updatedAt: '2024-02-28'
  }
]

// Documentos mock - Documentos que a empresa envia para a Petrobras
export const mockDocuments: Document[] = [
  {
    id: 'doc-001',
    projectId: 'proj-001',
    name: 'Plano de Trabalho - CO2 Capture',
    type: 'plano_trabalho',
    status: 'aprovado',
    uploadedAt: '2024-01-10',
    fileType: 'pdf',
    size: 2456000
  },
  {
    id: 'doc-002',
    projectId: 'proj-001',
    name: 'NF 001234 - Equipamentos Lab',
    type: 'nota_fiscal',
    category: 'Equipamentos e Material Permanente',
    status: 'com_divergencia',
    uploadedAt: '2024-02-15',
    fileType: 'pdf',
    size: 156000,
    extractedData: {
      cnpj: '12.345.678/0001-90',
      value: 85000,
      date: '2024-02-10',
      description: 'Espectrômetro de Massa',
      supplier: 'TechLab Equipamentos LTDA',
      category: 'Equipamentos e Material Permanente'
    }
  },
  {
    id: 'doc-003',
    projectId: 'proj-001',
    name: 'NF 001235 - Material de Consumo',
    type: 'nota_fiscal',
    category: 'Material de Consumo',
    status: 'aprovado',
    uploadedAt: '2024-02-20',
    fileType: 'pdf',
    size: 98000,
    extractedData: {
      cnpj: '98.765.432/0001-10',
      value: 12500,
      date: '2024-02-18',
      description: 'Reagentes químicos diversos',
      supplier: 'QuimiPro Distribuidora',
      category: 'Material de Consumo'
    }
  },
  {
    id: 'doc-004',
    projectId: 'proj-001',
    name: 'Comprovante de Diária - Viagem SP',
    type: 'comprovante',
    category: 'Diárias e Ajuda de Custo',
    status: 'aprovado',
    uploadedAt: '2024-03-05',
    fileType: 'pdf',
    size: 45000
  },
  {
    id: 'doc-005',
    projectId: 'proj-001',
    name: 'NF 001240 - Passagens Aéreas',
    type: 'nota_fiscal',
    category: 'Passagens e Locomoção',
    status: 'com_divergencia',
    uploadedAt: '2024-03-10',
    fileType: 'pdf',
    size: 178000,
    extractedData: {
      cnpj: '55.444.333/0001-22',
      value: 4500,
      date: '2024-03-08',
      description: 'Passagem aérea Rio-São Paulo',
      supplier: 'Agência Viagens Corp',
      category: 'Passagens e Locomoção'
    }
  },
  {
    id: 'doc-006',
    projectId: 'proj-001',
    name: 'Orçamento - Reforma Laboratório',
    type: 'orcamento',
    category: 'Obras e Instalações',
    status: 'pendente',
    uploadedAt: '2024-03-12',
    fileType: 'pdf',
    size: 320000
  },
  {
    id: 'doc-007',
    projectId: 'proj-001',
    name: 'Contrato de Prestação de Serviços',
    type: 'contrato',
    category: 'Obras e Instalações',
    status: 'analisado',
    uploadedAt: '2024-03-15',
    fileType: 'pdf',
    size: 890000
  },
  {
    id: 'doc-008',
    projectId: 'proj-001',
    name: 'Relatório Técnico - Parcela 1',
    type: 'relatorio_tecnico',
    category: 'Relatório',
    status: 'aprovado',
    uploadedAt: '2024-03-18',
    fileType: 'pdf',
    size: 1250000
  },
  {
    id: 'doc-009',
    projectId: 'proj-001',
    name: 'Recibo de Pagamento - Diárias',
    type: 'recibo',
    category: 'Diárias e Ajuda de Custo',
    status: 'pendente',
    uploadedAt: '2024-03-20',
    fileType: 'pdf',
    size: 65000
  }
]

// Divergências mock
export const mockDivergences: Divergence[] = [
  {
    id: 'div-001',
    projectId: 'proj-001',
    documentId: 'doc-003',
    type: 'valor_excedido',
    severity: 'alta',
    status: 'pendente',
    description: 'Valor do equipamento excede o limite aprovado na rubrica 3.2 do Plano de Trabalho',
    affectedValue: 15000,
    parcel: 2,
    planoTrabalhoRef: 'Rubrica 3.2 - Equipamentos de Laboratório (Limite: R$ 70.000,00)',
    manualGestaoRef: 'Art. 5.4.1 - Os valores unitários não podem exceder o limite aprovado no Plano de Trabalho sem prévia autorização',
    recommendation: 'Solicitar aditivo ao convênio ou substituir por equipamento de valor compatível',
    createdAt: '2024-02-16'
  },
  {
    id: 'div-002',
    projectId: 'proj-001',
    documentId: 'doc-006',
    type: 'categoria_invalida',
    severity: 'media',
    status: 'em_analise',
    description: 'Serviço de consultoria não previsto no Plano de Trabalho original',
    affectedValue: 45000,
    parcel: 3,
    planoTrabalhoRef: 'Rubrica 4.1 - Serviços Técnicos (Não inclui consultoria externa)',
    manualGestaoRef: 'Art. 6.2.3 - Despesas devem estar expressamente previstas no Plano de Trabalho aprovado',
    recommendation: 'Apresentar justificativa técnica e solicitar remanejamento de recursos',
    createdAt: '2024-03-11'
  },
  {
    id: 'div-003',
    projectId: 'proj-003',
    documentId: 'doc-010',
    type: 'documento_ausente',
    severity: 'critica',
    status: 'pendente',
    description: 'Relatório técnico da Parcela 2 não foi enviado dentro do prazo estabelecido',
    affectedValue: 640000,
    parcel: 2,
    planoTrabalhoRef: 'Cronograma de Entregas - Parcela 2 (Prazo: 30/01/2024)',
    manualGestaoRef: 'Art. 8.1.1 - O não envio dos relatórios técnicos impede a liberação da parcela subsequente',
    recommendation: 'Enviar imediatamente o relatório técnico e justificar o atraso',
    createdAt: '2024-02-01'
  },
  {
    id: 'div-004',
    projectId: 'proj-001',
    documentId: 'doc-007',
    type: 'fornecedor_restrito',
    severity: 'alta',
    status: 'pendente',
    description: 'Fornecedor consta na lista de impedimentos do CEIS/CNEP',
    affectedValue: 28000,
    parcel: 2,
    planoTrabalhoRef: 'Rubrica 2.1 - Material de Consumo',
    manualGestaoRef: 'Art. 7.3.2 - É vedada a contratação de fornecedores com restrições nos cadastros CEIS, CNEP ou CEPIM',
    recommendation: 'Cancelar a compra e selecionar fornecedor regular',
    createdAt: '2024-03-05'
  },
  {
    id: 'div-005',
    projectId: 'proj-002',
    documentId: 'doc-015',
    type: 'duplicidade',
    severity: 'baixa',
    status: 'resolvida',
    description: 'Nota fiscal apresentada em duplicidade na prestação de contas',
    affectedValue: 8500,
    parcel: 1,
    planoTrabalhoRef: 'Rubrica 2.1 - Material de Consumo',
    manualGestaoRef: 'Art. 9.1.4 - Cada documento fiscal só pode ser utilizado uma única vez na prestação de contas',
    recommendation: 'Remover a duplicidade e apresentar nova documentação',
    createdAt: '2024-02-20',
    resolvedAt: '2024-02-22'
  }
]

// Estatísticas do Dashboard
export const mockDashboardStats: DashboardStats = {
  totalProjects: 4,
  projectsWithDivergences: 2,
  analyzedParcels: 18,
  auditedValue: 15600000,
  inconsistentValue: 736500,
  complianceRate: 81.5
}

// Itens do Plano de Trabalho - Rubricas do Manual de Gestão Petrobras
export const mockPlanoTrabalhoItems: PlanoTrabalhoItem[] = [
  {
    id: 'pt-001',
    code: '1',
    name: 'Passagens e Locomoção',
    description: 'Despesas com passagens aéreas, terrestres e locomoção',
    approvedValue: 150000,
    usedValue: 95000,
    subcategories: [
      { id: 'pt-001-1', code: '1.1', name: 'Passagens Aéreas Nacionais', description: 'Passagens aéreas em território nacional', approvedValue: 80000, usedValue: 52000 },
      { id: 'pt-001-2', code: '1.2', name: 'Passagens Aéreas Internacionais', description: 'Passagens aéreas internacionais', approvedValue: 50000, usedValue: 35000 },
      { id: 'pt-001-3', code: '1.3', name: 'Transporte Terrestre', description: 'Táxi, uber, aluguel de veículos', approvedValue: 20000, usedValue: 8000 }
    ]
  },
  {
    id: 'pt-002',
    code: '2',
    name: 'Diárias e Ajuda de Custo',
    description: 'Despesas com hospedagem e alimentação em viagens',
    approvedValue: 120000,
    usedValue: 85000,
    subcategories: [
      { id: 'pt-002-1', code: '2.1', name: 'Diárias Nacionais', description: 'Diárias para viagens nacionais (máx R$ 500,00)', approvedValue: 70000, usedValue: 52000 },
      { id: 'pt-002-2', code: '2.2', name: 'Diárias Internacionais', description: 'Diárias conforme tabela FINEP', approvedValue: 40000, usedValue: 28000 },
      { id: 'pt-002-3', code: '2.3', name: 'Ajuda de Custo', description: 'Viagens superiores a 30 dias', approvedValue: 10000, usedValue: 5000 }
    ]
  },
  {
    id: 'pt-003',
    code: '3',
    name: 'Material de Consumo',
    description: 'Materiais consumíveis para pesquisa',
    approvedValue: 350000,
    usedValue: 280000,
    subcategories: [
      { id: 'pt-003-1', code: '3.1', name: 'Reagentes Químicos', description: 'Reagentes para laboratório', approvedValue: 200000, usedValue: 165000 },
      { id: 'pt-003-2', code: '3.2', name: 'Material de Escritório', description: 'Papelaria e consumíveis', approvedValue: 50000, usedValue: 35000 },
      { id: 'pt-003-3', code: '3.3', name: 'Outros Consumíveis', description: 'Demais materiais', approvedValue: 100000, usedValue: 80000 }
    ]
  },
  {
    id: 'pt-004',
    code: '4',
    name: 'Obras e Instalações',
    description: 'Obras de infraestrutura e instalações',
    approvedValue: 500000,
    usedValue: 320000,
    subcategories: [
      { id: 'pt-004-1', code: '4.1', name: 'Obras Civis', description: 'Construções e reformas (limite R$ 500 mil)', approvedValue: 300000, usedValue: 180000 },
      { id: 'pt-004-2', code: '4.2', name: 'Instalações Elétricas', description: 'Instalações elétricas e hidráulicas', approvedValue: 120000, usedValue: 95000 },
      { id: 'pt-004-3', code: '4.3', name: 'Adequações Laboratoriais', description: 'Adequação de espaços', approvedValue: 80000, usedValue: 45000 }
    ]
  },
  {
    id: 'pt-005',
    code: '5',
    name: 'Equipamentos e Material Permanente',
    description: 'Aquisição de equipamentos e bens permanentes',
    approvedValue: 800000,
    usedValue: 720000,
    subcategories: [
      { id: 'pt-005-1', code: '5.1', name: 'Equipamentos de Laboratório', description: 'Equipamentos científicos', approvedValue: 500000, usedValue: 485000 },
      { id: 'pt-005-2', code: '5.2', name: 'Equipamentos de Informática', description: 'Computadores e periféricos', approvedValue: 150000, usedValue: 145000 },
      { id: 'pt-005-3', code: '5.3', name: 'Equipamentos Importados', description: 'Equipamentos de origem estrangeira', approvedValue: 150000, usedValue: 90000 }
    ]
  }
]

// Regras do Manual de Gestão
export const mockManualGestaoRules: ManualGestaoRule[] = [
  {
    id: 'rule-001',
    article: '5.4.1',
    title: 'Limites de Valores',
    description: 'Os valores unitários de aquisições não podem exceder o limite aprovado no Plano de Trabalho sem prévia autorização formal do gestor do convênio.',
    type: 'obrigatorio',
    category: 'Aquisições'
  },
  {
    id: 'rule-002',
    article: '6.2.3',
    title: 'Previsão de Despesas',
    description: 'Todas as despesas devem estar expressamente previstas no Plano de Trabalho aprovado. Despesas não previstas requerem solicitação de aditivo.',
    type: 'obrigatorio',
    category: 'Despesas'
  },
  {
    id: 'rule-003',
    article: '7.3.2',
    title: 'Vedação de Fornecedores',
    description: 'É vedada a contratação de fornecedores com restrições nos cadastros CEIS, CNEP ou CEPIM.',
    type: 'proibido',
    category: 'Fornecedores'
  },
  {
    id: 'rule-004',
    article: '8.1.1',
    title: 'Relatórios Técnicos',
    description: 'O não envio dos relatórios técnicos dentro do prazo estabelecido impede a liberação da parcela subsequente do recurso.',
    type: 'obrigatorio',
    category: 'Relatórios'
  },
  {
    id: 'rule-005',
    article: '9.1.4',
    title: 'Unicidade Documental',
    description: 'Cada documento fiscal só pode ser utilizado uma única vez na prestação de contas. A duplicidade caracteriza irregularidade.',
    type: 'proibido',
    category: 'Documentação'
  },
  {
    id: 'rule-006',
    article: '10.2.1',
    title: 'Prazo de Pagamento',
    description: 'Os pagamentos devem ser realizados em até 30 dias após a emissão do documento fiscal, sob pena de glosa.',
    type: 'obrigatorio',
    category: 'Pagamentos'
  },
  {
    id: 'rule-007',
    article: '11.1.3',
    title: 'Cotações de Preço',
    description: 'Recomenda-se a realização de no mínimo 3 cotações de preço para aquisições acima de R$ 8.000,00.',
    type: 'recomendado',
    category: 'Aquisições'
  },
  {
    id: 'rule-008',
    article: '12.4.2',
    title: 'Identificação de Bens',
    description: 'Todos os bens adquiridos devem ser identificados com etiqueta de patrimônio vinculada ao projeto.',
    type: 'obrigatorio',
    category: 'Patrimônio'
  }
]

// Relatório de Auditoria
export const mockAuditReport: AuditReport = {
  id: 'audit-001',
  projectId: 'proj-001',
  generatedAt: '2024-03-20T10:30:00Z',
  complianceScore: 78,
  adherencePercentage: 82,
  criticalIssues: 1,
  missingDocuments: 2,
  suspiciousExpenses: 3,
  totalAnalyzed: 45,
  totalWithDivergences: 8,
  recommendations: [
    'Regularizar a documentação pendente da Parcela 2',
    'Solicitar aditivo para remanejamento de recursos entre rubricas',
    'Substituir fornecedor com restrição cadastral',
    'Apresentar justificativa técnica para despesa não prevista'
  ]
}

// Dados para gráficos
export const mockCategoryData: ChartData[] = [
  { name: 'Passagens e Locomoção', value: 95000, fill: 'var(--chart-1)' },
  { name: 'Diárias e Ajuda de Custo', value: 85000, fill: 'var(--chart-2)' },
  { name: 'Material de Consumo', value: 280000, fill: 'var(--chart-3)' },
  { name: 'Obras e Instalações', value: 320000, fill: 'var(--chart-4)' },
  { name: 'Equip. e Mat. Permanente', value: 720000, fill: 'var(--chart-5)' }
]

export const mockComplianceData: ChartData[] = [
  { name: 'Conforme', value: 81.5, fill: 'var(--chart-1)' },
  { name: 'Não Conforme', value: 18.5, fill: 'var(--destructive)' }
]

export const mockDivergenceTypeData: ChartData[] = [
  { name: 'Valor Excedido', value: 12 },
  { name: 'Categoria Inválida', value: 8 },
  { name: 'Doc. Ausente', value: 5 },
  { name: 'Fornecedor Restrito', value: 3 },
  { name: 'Duplicidade', value: 2 }
]

export const mockTimelineData: TimelineData[] = [
  { month: 'Jan', planejado: 450000, executado: 420000, divergencias: 15000 },
  { month: 'Fev', planejado: 520000, executado: 485000, divergencias: 28000 },
  { month: 'Mar', planejado: 480000, executado: 510000, divergencias: 45000 },
  { month: 'Abr', planejado: 550000, executado: 530000, divergencias: 12000 },
  { month: 'Mai', planejado: 600000, executado: 580000, divergencias: 8000 },
  { month: 'Jun', planejado: 520000, executado: 495000, divergencias: 22000 }
]
