const reais = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function parseCurrencyToBRL(valueInCents: number) {
  return reais.format(convertCentsToReais(valueInCents))
}

export function convertCentsToReais(valueInCents: number) {
  return valueInCents / 100
}