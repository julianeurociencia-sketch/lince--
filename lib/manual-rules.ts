// lib/manual-rules.ts

export type CategoriaDespesa = 
  | 'passagens_locomocao'
  | 'diarias_ajuda_custo'
  | 'material_consumo'
  | 'obras_instalacoes'
  | 'equipamentos'

export interface RegraManual {
  id: string
  titulo: string
  documentosObrigatorios: string[]
  regrasCriticas: string[]
  referenciaManual: string
}

export const manualPDIRules: Record<CategoriaDespesa, RegraManual> = {
  passagens_locomocao: {
    id: 'passagens_locomocao',
    titulo: 'Passagens e Locomoção',
    documentosObrigatorios: [
      'Nota fiscal da agência ou confirmação de compra (com atesto)',
      'Comprovante de pagamento (para compras após 01/09/2017)',
      'Comprovante de embarque / e-ticket (Obrigatório para voos)'
    ],
    regrasCriticas: [
      'Viagens nacionais de 1 dia devem ser sem despacho de bagagem (exceções exigem justificativa).',
      'Cartão de crédito pessoal só é aceito para passagens aéreas.'
    ],
    referenciaManual: 'Manual de PD&I Petrobras - Item 5.4.3.1'
  },
  diarias_ajuda_custo: {
    id: 'diarias_ajuda_custo',
    titulo: 'Diárias e Ajuda de Custo',
    documentosObrigatorios: [
      'Comprovante de depósito bancário na conta do favorecido',
      'Documentos de comprovação da viagem (e-ticket ou relatório)'
    ],
    regrasCriticas: [
      'Somente integrantes da equipe executora cadastrada podem receber.',
      'Valores devem respeitar o teto definido no Regulamento ANP vigente.'
    ],
    referenciaManual: 'Manual de PD&I Petrobras - Item 5.4.3.2'
  },
  material_consumo: {
    id: 'material_consumo',
    titulo: 'Material de Consumo',
    documentosObrigatorios: [
      'Nota fiscal com carimbo de atesto',
      'Comprovante de pagamento da nota fiscal'
    ],
    regrasCriticas: [
      'A quantidade discriminada na NF deve ser informada no sistema para o relatório ANP.'
    ],
    referenciaManual: 'Manual de PD&I Petrobras - Item 5.4.3.3'
  },
  obras_instalacoes: {
    id: 'obras_instalacoes',
    titulo: 'Obras e Instalações',
    documentosObrigatorios: [
      'Nota fiscal de serviço ou material com atesto',
      'Comprovante de pagamento da nota fiscal',
      'Guia de recolhimento de impostos e comprovante',
      'Relatório de detalhamento de despesas com obras civis assinado'
    ],
    regrasCriticas: [
      'A falta do Relatório de Detalhamento gera Pendência de Alta Relevância.'
    ],
    referenciaManual: 'Manual de PD&I Petrobras - Item 5.4.3.6'
  },
  equipamentos: {
    id: 'equipamentos',
    titulo: 'Equipamentos e Material Permanente',
    documentosObrigatorios: [
      'Nacional: Nota fiscal com atesto e comprovante de pagamento',
      'Importado: Contrato de câmbio, Invoice/DI, e comprovante de pagamento',
      'Compras Parceladas: Contrato de compra e venda assinado'
    ],
    regrasCriticas: [
      'Itens devem ser incorporados ao patrimônio da instituição executora.',
      'Recomenda-se evitar parcelamento de importados devido ao risco cambial.'
    ],
    referenciaManual: 'Manual de PD&I Petrobras - Item 5.4.3.7'
  }
}