/**
 * Funcoes de validacao reutilizaveis para formularios
 */

// Validacao de Email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validacao de Senha forte
export const validatePassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []

  if (password.length < 6) {
    errors.push('Minimo de 6 caracteres')
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Pelo menos 1 caractere especial (!@#$%^&*)')
  }

  const numberCount = (password.match(/\d/g) || []).length
  if (numberCount < 2) {
    errors.push('Pelo menos 2 numeros')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export type PasswordStrength = {
  level: 'weak' | 'medium' | 'strong'
  text: string
  color: string
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  let score = 0

  if (password.length >= 6) score += 1
  if (/[A-Za-z]/.test(password)) score += 1
  if ((password.match(/\d/g) || []).length >= 2) score += 1
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1

  if (score >= 4) {
    return {
      level: 'strong',
      text: 'Senha forte',
      color: 'text-green-600',
    }
  }

  if (score >= 2) {
    return {
      level: 'medium',
      text: 'Senha media',
      color: 'text-amber-600',
    }
  }

  return {
    level: 'weak',
    text: 'Senha fraca',
    color: 'text-red-500',
  }
}

// Validacao de CPF
export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '')

  if (cleanCPF.length !== 11) {
    return false
  }

  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return false
  }

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF[i]) * (10 - i)
  }
  let remainder = sum % 11
  const firstDigit = remainder < 2 ? 0 : 11 - remainder

  if (parseInt(cleanCPF[9]) !== firstDigit) {
    return false
  }

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF[i]) * (11 - i)
  }
  remainder = sum % 11
  const secondDigit = remainder < 2 ? 0 : 11 - remainder

  if (parseInt(cleanCPF[10]) !== secondDigit) {
    return false
  }

  return true
}

// Validacao de Telefone (apenas numeros)
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '')
  return cleanPhone.length >= 10 && cleanPhone.length <= 11
}

// Funcao auxiliar para formatar CPF
export const formatCPF = (cpf: string): string => {
  const cleanCPF = cpf.replace(/\D/g, '')
  return cleanCPF
    .slice(0, 11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

// Funcao para aplicar mascara de CPF enquanto digita
export const maskCPF = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')

  if (cleanValue.length <= 3) {
    return cleanValue
  } else if (cleanValue.length <= 6) {
    return cleanValue.replace(/(\d{3})(\d+)/, '$1.$2')
  } else if (cleanValue.length <= 9) {
    return cleanValue.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3')
  } else {
    return cleanValue
      .slice(0, 11)
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}

// Funcao auxiliar para formatar Telefone
export const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '')
  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
}

// Funcao para aplicar mascara de Telefone enquanto digita
export const maskPhone = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')

  if (cleanValue.length <= 2) {
    return cleanValue
  } else if (cleanValue.length <= 7) {
    return cleanValue.replace(/(\d{2})(\d+)/, '($1) $2')
  } else if (cleanValue.length <= 11) {
    return cleanValue.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3')
  } else {
    return cleanValue.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
}

// Validacao basica de campo obrigatorio
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}
