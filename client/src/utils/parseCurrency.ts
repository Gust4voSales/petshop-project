const reais = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function parseCurrencyValueInCentsToBRL(valueInCents: number) {
  return reais.format(convertCentsToReais(valueInCents))
}

export function convertCentsToReais(valueInCents: number) {
  return Number((valueInCents / 100).toFixed(2)) // https://stackoverflow.com/questions/1458633/how-can-i-deal-with-floating-point-number-precision-in-javascript?page=1&tab=scoredesc#tab-top

}

export function convertReaisToCents(valueInReais: number) {
  return Number((valueInReais * 100).toFixed(2)) // https://stackoverflow.com/questions/1458633/how-can-i-deal-with-floating-point-number-precision-in-javascript?page=1&tab=scoredesc#tab-top
}

export function parseMaskedCurrencyValueToNumber(value: string) {
  // removing all non-numeric characters
  return parseFloat(value.replaceAll('.', '').replace(',', '.'))
}

// Given any numeric string, mask it to be a currency with the format "0,00"
export function maskNumberToCurrency(rawValue: string | number) {
  const value = typeof rawValue === 'string' ? parseMaskedCurrencyValueToNumber(rawValue) : rawValue

  const maskedValue = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 }).format(
    isNaN(value) ? 0 : value
  );

  return maskedValue;
}
