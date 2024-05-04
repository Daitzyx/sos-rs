export const formatCep = (value: any) => {
  // Remove caracteres não numéricos
  const numericValue = value.replace(/\D/g, '')

  // Verifica se o valor tem mais de 5 dígitos
  if (numericValue.length > 5) {
    // Formata como "XXXXX-XXX"
    return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`
  } else {
    // Retorna o valor original
    return numericValue
  }
}
