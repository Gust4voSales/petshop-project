const reais = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function parseCurrecyToBRL(valueInCents: number) {
  return reais.format(valueInCents / 100)
}