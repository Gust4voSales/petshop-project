const reais = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function parseCurrencyToBRL(valueInCents: number) {
  return reais.format(valueInCents / 100)
}